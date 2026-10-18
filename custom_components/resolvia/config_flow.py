"""Config flow for ResolvIA."""

from typing import Any

from homeassistant.config_entries import ConfigEntry, ConfigFlow, ConfigFlowResult, OptionsFlow
from homeassistant.core import callback
from homeassistant.helpers import selector

from ._validation import vol
from .const import (
    CONF_REQUIRE_ADMIN,
    CONF_SIDEBAR_ICON,
    CONF_SIDEBAR_TITLE,
    DEFAULT_SIDEBAR_ICON,
    DEFAULT_SIDEBAR_TITLE,
    DOMAIN,
    NAME,
)


def _schema(defaults: dict[str, Any]) -> Any:
    return vol.Schema(
        {
            vol.Required(
                CONF_SIDEBAR_TITLE,
                default=defaults.get(CONF_SIDEBAR_TITLE, DEFAULT_SIDEBAR_TITLE),
            ): selector.TextSelector(),
            vol.Required(
                CONF_SIDEBAR_ICON,
                default=defaults.get(CONF_SIDEBAR_ICON, DEFAULT_SIDEBAR_ICON),
            ): selector.IconSelector(),
            vol.Required(
                CONF_REQUIRE_ADMIN,
                default=defaults.get(CONF_REQUIRE_ADMIN, False),
            ): selector.BooleanSelector(),
        }
    )


class ResolviaConfigFlow(ConfigFlow, domain=DOMAIN):
    """Add ResolvIA from Settings > Devices & services."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Single step: confirm and optionally rename the sidebar entry."""
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")
        if user_input is not None:
            return self.async_create_entry(title=NAME, data={}, options=user_input)
        return self.async_show_form(step_id="user", data_schema=_schema({}))

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> OptionsFlow:
        """Options: sidebar title, icon and admin-only."""
        return ResolviaOptionsFlow()


class ResolviaOptionsFlow(OptionsFlow):
    """Change how ResolvIA shows up in the sidebar."""

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        if user_input is not None:
            return self.async_create_entry(data=user_input)
        return self.async_show_form(
            step_id="init", data_schema=_schema(dict(self.config_entry.options))
        )
