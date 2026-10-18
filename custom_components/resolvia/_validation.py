"""Schema library shim.

Home Assistant 2026.x replaced voluptuous with probatio, which keeps the same
API. Older releases only ship voluptuous. Import whichever is available so the
integration loads on both.
"""

try:  # Home Assistant 2026.x and newer
    import probatio as vol  # noqa: F401
except ImportError:  # pragma: no cover - older Home Assistant
    import voluptuous as vol  # type: ignore[no-redef]  # noqa: F401

__all__ = ["vol"]
