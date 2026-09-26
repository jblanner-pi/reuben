# Phase 4 Integration and Email Client QA

## Phase 4 outcome

Normalize the four public Reuben modules behind stable inputs, connect the published Figma components to those implementations, and validate representative assembled emails across the supported client matrix.

This document defines the coverage contract and records the entry audit. It does not claim that cross-client rendering has been executed; that requires test sends or an email rendering service.

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

### Extended smoke coverage

Other standard clients receive best-effort smoke coverage after the required matrix passes. Record the exact application, operating system, and version whenever one is tested. Samsung Email on Android and AOL web are useful representative additions, but they are not substitutes for the required matrix above.

## Test fixtures

Build at least three complete test emails so modules are validated in composition rather than only as isolated fragments.

1. Standard header + one-column post + three-link row.
2. Logo-only header + two-column/two-post module + centered single-link preheader.
3. Image-only header + three-column/three-post module, including long text, missing optional copy, and mixed star states.

Every fixture must use production-like absolute image URLs, meaningful alt text, non-empty links, a plain-text part, and tracking parameters representative of the sending platform.

## Required checks by client

| Area | Pass condition |
|---|---|
| Outer layout | Desktop content is centered at 700 px maximum; content modules remain within 652 px. No horizontal scrolling. |
| Responsive behavior | At 480 px and below, `.wrap` content becomes fluid and multi-column modules stack without clipped text or images. |
| Headers | Standard, Logo-only, and Image-only states match the Figma contract. Header height and artwork remain legible with images blocked. |
| Preheader | One centered link. Default presentation is white. The primitive adds no intrinsic background or outer padding; the wrapper may apply custom background, 24 px horizontal padding, and 8 px vertical padding. |
| Media | Full-, two-, and three-column images preserve their intended aspect ratio. Variable-height images do not distort or overflow. |
| Star rating | Icons have transparent backgrounds. Three-column stars are 16 px; no star exceeds 20 px. Icons and numeric score remain fully visible. |
| Buttons | 16 px label text, intended fixed/content width, 48 px target height, and readable fallback in Outlook. No clipped label at 200% text scaling. |
| Typography | Brand fonts fall back safely. Line-height and wrapping remain readable when remote fonts are unavailable. |
| Links | Links remain distinguishable, clickable, and correctly tracked. Long labels wrap without changing the module width. |
| Images blocked | Alt text communicates purpose; layout does not collapse into unusable gaps. Decorative images use empty alt text intentionally. |
| Accessibility | Reading order is logical, presentation tables use `role="presentation"`, text contrast is acceptable, and tap targets are usable. |
| Dark mode | No essential text disappears, logos remain recognizable, and transparent stars do not gain opaque boxes. Client color transformations are documented rather than silently accepted. |

## Module coverage

| Module | Desktop | Mobile | Special cases |
|---|---|---|---|
| `nl-header` | Standard, Logo-only, Image-only | Standard, Logo-only, Image-only | Images blocked; Outlook VML/background fallback; long title and tagline |
| `1col_1post_full-width` | Full-width | Fluid full-width | Variable-height media; long headline/copy; hidden optional fields |
| `2col_2post` | Two columns | Stacked | Unequal content length; link and CTA wrapping |
| `3col_3post` | Three columns | Stacked full-width | 16 px stars; unequal content length; divider/link-row behavior |

## Evidence record

For each client/surface, capture:

- fixture name and build identifier;
- client, operating system, and version;
- viewport/device;
- screenshot with images on and, where supported, images blocked;
- pass/fail result by check area;
- defect link, severity, owner, and retest result.

A module is ready only when all required clients pass or an exception is documented with an approved fallback.

## Entry audit — 2026-09-26

### Passed

- The Phase 3 Figma structure and screenshots are validated.
- All ten Figma component sets report `CURRENT` after publication verification.
- Desktop/mobile variants exist for all four public modules.
- The repository preserves the imported production sources as read-only snapshots.
- The base template provides the 480 px responsive breakpoint and fluid `.wrap` behavior.
- The source includes table-based layout, presentation roles, Outlook conditional markup, and VML for the image-background header.
- Normalized renderers implement all four public modules and the required reusable primitives.
- Six unit tests pass.
- Three assembled fixtures pass static QA and desktop/mobile browser smoke checks with no horizontal overflow.
- The four approved public modules have verified Figma Code Connect path mappings to `src/components/modules.js`.

### Must be resolved before Code Connect publication

1. **Dynamic Code Connect publication:** the local parserless templates are property-aware, but Figma's current MCP endpoint stored path mappings only and reports `hasTemplate: false`.
2. **External client QA:** run the generated fixtures through the required Apple Mail, Gmail, Outlook, Yahoo, iOS, and Android matrix.

The Figma Code Connect map is currently empty for `nl-header`, `1col_1post_full-width`, `2col_2post`, and `3col_3post`, which is the intended safe state until these entry items pass.

### Required external QA capability

Use the team's normal sending platform plus physical devices, or connect an email rendering service that covers the required clients. Browser screenshots alone cannot validate Outlook desktop rendering, client CSS transformations, image blocking, or mobile mail applications.

## Phase 4 sequence

1. Publish the property-aware templates through a template-capable Code Connect path and verify them in Dev Mode.
2. Run the required client matrix, resolve defects, and store evidence.
3. Close Phase 4 only after the matrix passes or approved exceptions are recorded.
