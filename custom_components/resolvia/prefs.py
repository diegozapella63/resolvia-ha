"""Shared preferences for ResolvIA (list names, colors, icons, visibility).

Stored in .storage/resolvia.prefs so every device sees the same customization.
Exposed to the panel over three small websocket commands.
"""

from typing import Any

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.storage import Store

from ._validation import vol
from .const import DATA_PREFS, DATA_STORE, DOMAIN, STORAGE_KEY, STORAGE_VERSION

# key -> (type, max length for strings / max items for lists)
LIST_FIELDS: dict[str, tuple[type, int]] = {
    "name": (str, 80),
    "color": (str, 24),
    "icon": (str, 40),
    "hidden": (bool, 0),
}

APP_FIELDS: dict[str, tuple[type, int]] = {
    "accent": (str, 24),
    "group_by_device": (bool, 0),
    "show_done": (bool, 0),
    "list_order": (list, 200),
}

MAX_LISTS = 500


def _empty() -> dict[str, Any]:
    return {"lists": {}, "app": {}}


def _clean(raw: dict[str, Any], fields: dict[str, tuple[type, int]]) -> dict[str, Any]:
    """Keep only known keys with sane values. None means "remove this key"."""
    out: dict[str, Any] = {}
    for key, value in raw.items():
        if key not in fields:
            continue
        if value is None:
            out[key] = None
            continue
        typ, limit = fields[key]
        if typ is bool:
            out[key] = bool(value)
        elif typ is str:
            if not isinstance(value, str):
                raise ValueError(f"{key} must be text")
            out[key] = value.strip()[:limit]
        elif typ is list:
            if not isinstance(value, list) or not all(isinstance(v, str) for v in value):
                raise ValueError(f"{key} must be a list of text")
            out[key] = [v[:255] for v in value[:limit]]
    return out


def _merge(target: dict[str, Any], changes: dict[str, Any]) -> dict[str, Any]:
    merged = dict(target)
    for key, value in changes.items():
        if value is None or value == "":
            merged.pop(key, None)
        else:
            merged[key] = value
    return merged


async def async_load_prefs(hass: HomeAssistant) -> None:
    """Load stored preferences into hass.data."""
    data = hass.data.setdefault(DOMAIN, {})
    if DATA_STORE in data:
        return
    store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, STORAGE_KEY)
    loaded = await store.async_load()
    prefs = _empty()
    if isinstance(loaded, dict):
        if isinstance(loaded.get("lists"), dict):
            prefs["lists"] = loaded["lists"]
        if isinstance(loaded.get("app"), dict):
            prefs["app"] = loaded["app"]
    data[DATA_STORE] = store
    data[DATA_PREFS] = prefs


def _schedule_save(hass: HomeAssistant) -> None:
    data = hass.data[DOMAIN]
    data[DATA_STORE].async_delay_save(lambda: data[DATA_PREFS], 1)


@websocket_api.websocket_command({vol.Required("type"): "resolvia/prefs/get"})
@callback
def ws_get_prefs(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Return all preferences."""
    connection.send_result(msg["id"], hass.data[DOMAIN][DATA_PREFS])


@websocket_api.websocket_command(
    {
        vol.Required("type"): "resolvia/prefs/set_list",
        vol.Required("entity_id"): str,
        vol.Required("prefs"): dict,
    }
)
@callback
def ws_set_list_prefs(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Merge preferences for one to-do list."""
    entity_id: str = msg["entity_id"]
    if not entity_id.startswith("todo.") or len(entity_id) > 255:
        connection.send_error(msg["id"], "invalid_format", "Not a to-do entity")
        return
    try:
        changes = _clean(msg["prefs"], LIST_FIELDS)
    except ValueError as err:
        connection.send_error(msg["id"], "invalid_format", str(err))
        return

    prefs = hass.data[DOMAIN][DATA_PREFS]
    lists: dict[str, Any] = dict(prefs["lists"])
    merged = _merge(lists.get(entity_id, {}), changes)
    if merged:
        if entity_id not in lists and len(lists) >= MAX_LISTS:
            connection.send_error(msg["id"], "invalid_format", "Too many lists")
            return
        lists[entity_id] = merged
    else:
        lists.pop(entity_id, None)
    prefs["lists"] = lists
    _schedule_save(hass)
    connection.send_result(msg["id"], prefs)


@websocket_api.websocket_command(
    {
        vol.Required("type"): "resolvia/prefs/set_app",
        vol.Required("prefs"): dict,
    }
)
@callback
def ws_set_app_prefs(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Merge app-wide preferences."""
    try:
        changes = _clean(msg["prefs"], APP_FIELDS)
    except ValueError as err:
        connection.send_error(msg["id"], "invalid_format", str(err))
        return
    prefs = hass.data[DOMAIN][DATA_PREFS]
    prefs["app"] = _merge(prefs["app"], changes)
    _schedule_save(hass)
    connection.send_result(msg["id"], prefs)


@callback
def async_register_websocket_commands(hass: HomeAssistant) -> None:
    """Register the websocket commands (once per Home Assistant run)."""
    websocket_api.async_register_command(hass, ws_get_prefs)
    websocket_api.async_register_command(hass, ws_set_list_prefs)
    websocket_api.async_register_command(hass, ws_set_app_prefs)
