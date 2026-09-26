# Reuben Email System Pilot

An isolated pilot repository for mapping the Reuben Figma email system to production-safe responsive HTML email components.

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
- All four public modules are connected to their normalized renderer paths in Figma under the `Javascript` label.
- Phase 4 normalized renderers now live under `src/components/`; the imported production HTML remains a read-only reference.
- Three assembled fixtures pass unit tests, static email checks, and desktop/mobile browser smoke checks without horizontal overflow.
- Property-aware parserless templates are committed under `code-connect/`, but Figma's current MCP endpoint stored path mappings only (`hasTemplate: false`). Dynamic property snippets remain pending a template-capable publication path.
- Figma's official Code Connect CLI 2.0.1 is installed locally. All four templates pass CLI parsing and are ready for token-authenticated publication.
- Required cross-client testing in Apple Mail, Gmail, Outlook, Yahoo, iOS, and Android remains pending an email-test sending or rendering workflow.
- Phase 4 client coverage and entry criteria are documented in `docs/phase-4-integration-and-qa.md`.
- Code Connect publishing instructions are documented in `docs/code-connect-publishing.md`.

## Source references

- Reuben desktop frame: `9HDCl19mRQIR5cEUW6GZ0y`, node `69:4036`
- Reuben mobile frame: `9HDCl19mRQIR5cEUW6GZ0y`, node `69:4053`
- Phase 3 library: `ypyq0Th1HES77IfxpXS2jq`
- See `../REUBEN_SOURCE_INVENTORY.md` for the full source inventory and audit notes.
