# Reuben Email System Pilot

An isolated pilot repository for mapping the Reuben Figma email system to the established production-safe Reuben HTML framework.

## Safety boundary

- `source/reuben/` contains read-only snapshots imported from the supplied Google Drive system on 2026-09-20.
- Do not edit the snapshot files. New work belongs in `src/`, `code-connect/`, `schemas/`, or `docs/`.
- Nothing in this repository changes the original Drive files or Figma designs.
- Code Connect mappings must be reviewed before they are published to Figma.

## Current status

- Production HTML snapshot imported.
- Reuben desktop and mobile Figma component inventories inspected.
- Phase 3 is complete in the isolated Figma file `ypyq0Th1HES77IfxpXS2jq`.
- Six local primitives and four public modules have been built and validated.
- The reviewed component-to-source map is documented in `docs/component-mapping-proposal.md`.
- Four property-aware Code Connect templates point to the new component-set IDs.
- All ten Figma component sets report `CURRENT` after publication verification on 2026-09-26.
- The first Code Connect templates were published on 2026-09-26 and report `hasTemplate: true`; they still target the retired normalized-renderer experiment until the source-aware replacements are reviewed and republished.
- Phase 4 now treats `source/reuben/` as the canonical code framework rather than reconstructing its HTML in new renderers.
- `src/reuben-framework.js` selects exact source fragments, extracts their body markup unchanged, and inserts them into the canonical base template.
- `mapping/reuben-source-catalog.json` records exact matches, nearest legacy patterns, and unsupported Figma variants without fabricating code.
- Three source-backed fixtures replace the earlier renderer-generated fixtures. Static QA separates assembly failures from inherited source warnings.
- The normalized renderers under `src/components/` are retained only as an experimental comparison and are not on the Phase 4 production path.
- Source-aware Code Connect templates are prepared locally and must be reviewed before they replace the published renderer mappings.
- Required cross-client testing in Apple Mail, Gmail, Outlook, Yahoo, iOS, and Android remains pending an email-test sending or rendering workflow.
- Phase 4 client coverage and entry criteria are documented in `docs/phase-4-integration-and-qa.md`.
- The canonical assembly workflow is documented in `docs/source-framework-workflow.md`.
- Code Connect publishing instructions are documented in `docs/code-connect-publishing.md`.

## Source references

- Reuben desktop frame: `9HDCl19mRQIR5cEUW6GZ0y`, node `69:4036`
- Reuben mobile frame: `9HDCl19mRQIR5cEUW6GZ0y`, node `69:4053`
- Phase 3 library: `ypyq0Th1HES77IfxpXS2jq`
- See `../REUBEN_SOURCE_INVENTORY.md` for the full source inventory and audit notes.
