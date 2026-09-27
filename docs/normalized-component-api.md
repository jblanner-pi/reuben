# Experimental Normalized Renderer API

## Status

This API is retired from the Phase 4 production path as of 2026-09-27.

The renderer experiment under `src/components/` proved that the Figma components could be expressed behind stable JavaScript inputs. It also duplicated responsive email markup already present in the established Reuben framework. Maintaining both implementations would create drift and require the new version to repeat years of client-compatibility validation.

Phase 4 now uses `src/reuben-framework.js` to select and compose exact body fragments from the read-only `source/reuben/` snapshot. See `docs/source-framework-workflow.md`.

## What remains useful

- The normalized content-field vocabulary.
- URL and text-safety validation ideas.
- The fixture and automated-test approach.
- The Figma component-property inventory.

These ideas may inform a future controlled authoring layer, but that layer must modify only cataloged content fields around canonical Reuben markup. The experimental renderers are not approved production implementations and are no longer Code Connect targets.
