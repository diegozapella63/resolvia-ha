"""ResolvIA: a nicer home for Home Assistant's to-do lists.

Registers a sidebar panel that reads and edits the native todo.* entities
(Local To-do, Shopping list, Alexa, Google Tasks, ...) through Home Assistant's
own todo websocket API and services. Nothing is copied: the lists stay where
they are, ResolvIA is only a different way to look at them.
"""

import hashlib
import inspect
import logging
from pathlib import Path
from typing import Any

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.typing import ConfigType

from .const import (
    CONF_REQUIRE_ADMIN,
    CONF_SIDEBAR_ICON,
    CONF_SIDEBAR_TITLE,
    DATA_STATIC_REGISTERED,
    DATA_WS_REGISTERED,
    DEFAULT_SIDEBAR_ICON,
    DEFAULT_SIDEBAR_TITLE,
    DOMAIN,
    FRONTEND_DIR,
    FRONTEND_FILE,
    PANEL_URL_PATH,
    STATIC_URL,
    WEBCOMPONENT_NAME,
)
from .prefs import async_load_prefs, async_register_websocket_commands

_LOGGER = logging.getLogger(__name__)

CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)

FRONTEND_PATH = Path(__file__).parent / FRONTEND_DIR


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up the integration (websocket commands + stored preferences)."""
    data = hass.data.setdefault(DOMAIN, {})
    await async_load_prefs(hass)
    if not data.get(DATA_WS_REGISTERED):
        async_register_websocket_commands(hass)
        data[DATA_WS_REGISTERED] = True
    return True


def _file_hash(path: Path) -> str:
    """Short content hash used to bust the browser cache after updates."""
    try:
        return hashlib.sha256(path.read_bytes()).hexdigest()[:10]
    except OSError:
        return "0"


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Register the sidebar panel."""
    data = hass.data.setdefault(DOMAIN, {})
    await async_load_prefs(hass)
    if not data.get(DATA_WS_REGISTERED):
        async_register_websocket_commands(hass)
        data[DATA_WS_REGISTERED] = True

    # Static paths cannot be unregistered, so register them once per run.
    if not data.get(DATA_STATIC_REGISTERED):
        await hass.http.async_register_static_paths(
            [StaticPathConfig(STATIC_URL, str(FRONTEND_PATH), cache_headers=True)]
        )
        data[DATA_STATIC_REGISTERED] = True

    version = await hass.async_add_executor_job(_file_hash, FRONTEND_PATH / FRONTEND_FILE)
    options = {**entry.data, **entry.options}

    kwargs: dict[str, Any] = {
        "frontend_url_path": PANEL_URL_PATH,
        "webcomponent_name": WEBCOMPONENT_NAME,
        "sidebar_title": options.get(CONF_SIDEBAR_TITLE) or DEFAULT_SIDEBAR_TITLE,
        "sidebar_icon": options.get(CONF_SIDEBAR_ICON) or DEFAULT_SIDEBAR_ICON,
        "module_url": f"{STATIC_URL}/{FRONTEND_FILE}?v={version}",
        "embed_iframe": False,
        "require_admin": bool(options.get(CONF_REQUIRE_ADMIN, False)),
        "config": {"version": version},
    }
    # Only pass arguments this Home Assistant release knows about.
    accepted = inspect.signature(panel_custom.async_register_panel).parameters
    kwargs = {k: v for k, v in kwargs.items() if k in accepted}

    # A panel left behind by a failed reload would make registration fail.
    frontend.async_remove_panel(hass, PANEL_URL_PATH, warn_if_unknown=False)
    await panel_custom.async_register_panel(hass, **kwargs)

    entry.async_on_unload(entry.add_update_listener(_async_options_updated))
    return True


async def _async_options_updated(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Re-register the panel when the sidebar title or icon changes."""
    await hass.config_entries.async_reload(entry.entry_id)


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Remove the sidebar panel."""
    frontend.async_remove_panel(hass, PANEL_URL_PATH, warn_if_unknown=False)
    return True
