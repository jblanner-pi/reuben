# Reuben Figma-to-Source Component Map

This document records the reviewed design-to-code mapping for the Phase 3 pilot. The target is the new, isolated Figma library file `ypyq0Th1HES77IfxpXS2jq`; legacy Reuben files remain references only.

## Phase 3 status

- Ten component sets are complete and validated in the target Figma file.
- Four public modules have direct production HTML source matches.
- Six local primitives describe reusable design anatomy but do not yet have standalone production code components.
- All ten component sets report `CURRENT` after publication verification on 2026-09-26.
- The normalized renderer experiment under `src/components/` is retired from the Phase 4 production path.
- Published Code Connect templates currently point to that experiment and report `hasTemplate: true`.
- Replacement templates now resolve the canonical files through `src/reuben-framework.js`; they remain local pending mapping review.

## Component inventory

| Figma component | Component-set node | Figma authoring API | Production source | Connection status |
|---|---:|---|---|---|
| `Email/Button` | `25:2` | Style, width, label | Button CSS and table patterns in `source/reuben/css/Reuben_BaseTemplate_08_2023.html` | Design primitive only; normalize a reusable code component before connecting |
| `Email/Media` | `29:5` | Size, artwork | Repeated image tables in the mapped content blocks | Design primitive only; embedded in module HTML today |
| `Email/Star rating` | `33:12` | Size, score, star swaps | Repeated rating tables in the mapped content blocks | Design primitive only; embedded in module HTML today |
| `Email/Preheader link` | `37:2` | Viewport, text | `source/reuben/elements/reuben-preheader-link-lr.html` | Design primitive only; normalize before connecting |
| `Email/Post content` | `44:51` | Content, layout, moniker, headline, body, five link labels | Standard content stacks in the one-, two-, and three-column source modules; Text-only maps to `source/reuben/content-blocks/reuben-1col-1post-text-only-cta.html` | Design primitive only; embedded in module HTML today |
| `Email/Three-link row` | `50:2` | Viewport, three link labels | `source/reuben/elements/reuben-3col-3links.html` | Design primitive only; normalize before connecting |
| `nl-header` | `57:10` | Content, viewport, title, tagline, header image | `source/reuben/content-blocks/reuben-header-solid-bg.html`; nearest image pattern: `reuben-header-image-bg.html` | Standard has legacy source with a bundled-preheader gap; Logo-only and Image-only are design-only gaps |
| `1col_1post_full-width` | `61:69` | Viewport, media, post content | `source/reuben/content-blocks/reuben-1col-1post-full-width.html` | Exact source-backed mapping prepared |
| `2col_2post` | `68:136` | Viewport, section title | `source/reuben/content-blocks/reuben-2col-2post.html` | Exact source-backed mapping prepared |
| `3col_3post` | `75:387` | Viewport, section title | `source/reuben/content-blocks/reuben-3col-3post.html` | Source-backed mapping prepared with legacy 24 px star gap recorded |

## Code Connect readiness

The four public-module templates in `code-connect/` resolve design selections to the canonical source catalog. They no longer present newly generated table markup as the production implementation.

The remaining integration sequence is:

1. Review the prepared source-aware Code Connect snippets and explicit gap behavior.
2. Replace the currently published renderer mappings only after approval.
3. Validate source-backed fixtures against the supported email-client matrix.
4. Route canonical source corrections through the upstream Reuben process and record approved exceptions before declaring Phase 4 complete.

## Known, explicit gaps

- The `nl-header` Figma set includes Standard, Logo-only, and Image-only states, but the existing code framework does not contain exact Logo-only or full-width Image-only fragments. The image-background source is a nearest pattern, not an exact mapping.
- The legacy solid-header source still includes a preheader row, while the Figma `nl-header` component intentionally does not. This remains an explicit upstream source gap.
- The legacy preheader source contains two links, a gray background, and outer padding. The current Figma primitive is one centered link with a white default presentation and no intrinsic background or outer padding; its wrapper owns those presentation values.
- The legacy `3col_3post` source uses 24 px star artwork. The current Figma contract specifies 16 px for the three-column layout, so the source correction requires upstream approval.
- The current image-background header source overlays logo/title artwork. It is not an exact implementation of the new full-width Image-only variant; that branch needs a dedicated normalized output state.
- `3col_3post` mobile-full-width is an explicit design state; production implements the behavior through responsive classes rather than a separate component API.
- The mobile `1col_1post_full-width` composition uses a fresh narrow post-content instance so text remains visible without clipping.
- `Email/Post content` uses `Content` and `Layout` axes. Standard supports Full-width, Two-column / Mobile, and Three-column. Text-only supports 604 px Full-width and 304 px Two-column / Mobile variants with headline, copy, five independently editable links, and the existing fixed-width `Email/Button` instance as its CTA.
- `nl-header` intentionally excludes the preheader from its public API; compose the separate `Email/Preheader link` primitive when a preheader is required.
- Footer, advertising, overlay, staggered, vertical-list, automated-list, social-share, and byline modules remain outside the Phase 3 pilot.

## Source-of-truth order

1. Production HTML for email-safe structure and client workarounds.
2. The current Reuben guide for visual intent and property vocabulary.
3. The Reuben theme library for brand color and typography.
4. The new pilot Figma file for reviewed component definitions and local email-layout variables.
