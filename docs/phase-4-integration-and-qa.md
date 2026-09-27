# Phase 4 Source Integration and Email Client QA

## Phase 4 outcome

Engineer an AI-assisted assembly and QA process around the existing Reuben responsive HTML framework. The canonical base template and component fragments remain unchanged; automation selects them, composes complete emails, records source provenance, and validates the results across supported clients.

Phase 4 does not replace working Reuben table markup with newly generated components.

## Supported client matrix

### Required desktop coverage

| Client | Minimum test surface |
|---|---|
| Apple Mail | Current supported macOS release |
| Gmail | Web client in a current Chromium browser |
| Outlook | Classic Outlook for Windows, new Outlook for Windows, Outlook for macOS, and Outlook on the web |
| Yahoo | Web client in a current Chromium browser |

### Required mobile coverage

| Platform | Clients |
|---|---|
| iOS | Apple Mail, Gmail, Outlook, Yahoo |
| Android | Gmail, Outlook, Yahoo |

Other standard clients receive best-effort smoke coverage after the required matrix passes.

## Source-backed fixtures

1. Canonical solid-background header + canonical one-column/full-width post.
2. Canonical solid-background header + canonical two-column/two-post module.
3. Canonical image-background header + canonical three-column/three-post module.

Each fixture uses the shared CSS, wrappers, and footer from `source/reuben/templates/reuben-newsletter-template.html`. Every inserted fragment is bounded by `reuben-source:start` and `reuben-source:end` provenance comments.

The fixtures intentionally retain source placeholder content for baseline rendering. Link validation and production content population belong to the controlled authoring layer that follows rendering validation.

Fixture files:

- `standard-one-column.html`
- `standard-two-column.html`
- `image-three-column.html`

## Required rendering checks

| Area | Pass condition |
|---|---|
| Source fidelity | Inserted fragment bodies match the canonical snapshot exactly. |
| Outer layout | Desktop content is centered at 700 px maximum; 652 px modules remain inside the wrapper. |
| Responsive behavior | At 480 px and below, `.wrap` content becomes fluid and multi-column modules follow their existing source behavior. |
| Outlook | Conditional markup and VML render without broken structure or clipped content. |
| Images blocked | Existing alt text and layout fallbacks remain usable; missing alt text is logged as a source defect. |
| Typography | Brand fonts fall back safely and wrapping remains readable. |
| Dark mode | Essential content remains visible and image backgrounds do not obscure artwork. |
| Accessibility | Reading order is logical; missing presentation roles or alt text are logged as source defects. |

## Known source gaps entering client QA

1. The solid-background header includes a preheader; the current Figma `nl-header` intentionally excludes it.
2. No exact legacy source exists for the Figma Logo-only header.
3. The legacy image-background header is not the new full-width Image-only design.
4. Figma now standardizes all star icons at 24 px. The legacy one- and two-column modules still use 20 px stars; the three-column module already matches at 24 px.
5. Canonical fragments retain authoring placeholders, empty links, HTTP image URLs, and some tables without `role="presentation"`.

These are tracked findings, not assembly failures. Any correction should be approved for the upstream Reuben framework and then imported, rather than silently maintained as a local fork.

## Local browser baseline — 2026-09-27

All three fixtures were rendered at 900 px desktop and 390 px mobile widths in headless Chromium.

- No horizontal overflow occurred in any of the six renders.
- Multi-column modules retained their desktop layout and stacked using the canonical mobile behavior.
- The one- and two-column fixtures rendered the canonical 20 px stars, confirming the remaining source gap above.
- The three-column fixture rendered 24 px stars and now matches the unified Figma standard.
- External placeholder artwork was not consistently available in the local capture environment; Email on Acid remains the rendering authority for production-client evidence.

## Evidence record

For every test, capture fixture name, source commit, client and OS version, viewport/device, screenshots, pass/fail area, defect owner, and retest result. Phase 4 closes only when required clients pass or explicit exceptions are approved.

## Phase 4 sequence

1. Build complete fixtures from canonical Reuben source fragments. **Complete locally.**
2. Review the proposed source-aware Code Connect templates. **Pending review; do not publish yet.**
3. Run the three fixtures through Email on Acid Campaign Precheck using share links.
4. Classify each defect as an existing source issue, a Figma/source gap, or an assembly issue.
5. Fix assembly issues locally; route canonical source corrections through the upstream Reuben process.
6. Rebuild and retest affected fixtures.
7. Publish reviewed Code Connect mappings and close Phase 4 after required clients pass or exceptions are approved.
