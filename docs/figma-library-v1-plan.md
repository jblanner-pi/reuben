# Reuben Email Figma Library v1

## Target

- Figma file: `ypyq0Th1HES77IfxpXS2jq`
- Purpose: publish editable, code-aligned Reuben email components without changing the existing production files or legacy Figma libraries.
- Token strategy: depend on `🧰 reuben_newsletter_theme` for brand color and typography; own only email-layout foundations that are defined in this repository.

## Required Figma file setup

- Add the organization library `🧰 reuben_newsletter_theme` to the target file before component construction.
- Library key: `lk-1f2325374687b56e1e2fd4632bdf4f94316abd13b2e8433f418f8ef17615063934e3f2894836412861571248ab817c0fef00cbbf332c1f920e52f5df4b0c7afb`.
- The library is available to the organization but was not subscribed to the target file during the Phase 2 audit. Figma's Plugin API cannot enable a library, so this is a one-time manual file action.

## Public component scope

1. `nl-header`
2. `1col_1post_full-width`
3. `2col_2post`
4. `3col_3post`

## Required local primitives

- `Email/Button`
- `Email/Media`
- `Email/Star rating`
- `Email/Preheader link`
- `Email/Post content`
- `Email/Three-link row`

Only primitives needed by the four public modules are in v1. Footer, advertising, overlay, staggered, vertical-list, automated-list, social-share, and byline modules are deferred.

## Source-of-truth rules

1. Production HTML determines email-safe structure, widths, breakpoints, and client workarounds.
2. The current Reuben newsletter guide is the visual and property-model reference.
3. The Reuben newsletter theme remains the brand token dependency.
4. The new Figma file owns the updated components and email-layout variables.
5. A design state that cannot be represented by the current production source is documented as a gap rather than silently treated as implemented.

## Locked email-layout foundations

| Token | Value | Production evidence |
|---|---:|---|
| `layout/email/outer-width` | 700px | Header and boilerplate wrapper |
| `layout/email/content-width` | 652px | Four pilot content blocks |
| `layout/email/gutter` | 24px | `(700 - 652) / 2` and production padding utilities |
| `layout/email/two-column-width` | 314px | `2col_2post` |
| `layout/email/three-column-width` | 201px | `3col_3post` |
| `layout/email/column-gap` | 24px | Two- and three-column source markup |
| `layout/email/mobile-breakpoint` | 480px | Base-template media query |
| `size/button/height` | 48px | Base-template button CSS |
| `size/button/default-width` | 160px | Full-width post button table |
| `radius/button` | 4px | Base-template button link CSS |
| `size/divider` | 1px | Link-row borders |
| `size/rating/compact` | 16px | Corrected compact icon width; artwork scales with bounds |
| `size/rating/standard` | 20px | Corrected maximum icon width; artwork scales with bounds |
| `spacing/4` | 4px | Base-template utility |
| `spacing/8` | 8px | Base-template utility |
| `spacing/10` | 10px | Base-template utility |
| `spacing/12` | 12px | Header/image spacing |
| `spacing/16` | 16px | Base-template utility |
| `spacing/20` | 20px | Base-template utility |
| `spacing/24` | 24px | Base-template utility |
| `spacing/32` | 32px | Base-template utility |

## Gap analysis

### Exists in production code but not as a stable Figma/code API

- Table/VML/client-specific implementation details.
- Responsive behaviors expressed through classes such as `wrap`, `padding-none`, and mobile padding utilities.
- Fixed structural widths and Outlook-safe button tables.
- A normalized component props interface; the imported HTML files remain monolithic snippets.

### Exists in the current Figma guide but not in the mapped production source

- `nl-header` image-background branch in the solid-header source mapping.
- Fine-grained top-level toggles for nested post content that are edited manually in HTML today.
- `3col_3post` mobile-full-width as an explicit design variant; code achieves it through responsive CSS rather than a separate component API.

### Conflicts and resolutions

- Figma canvas width `700px` vs content-module width `652px`: preserve both as separate outer and content tokens.
- Figma properties vs monolithic HTML: keep design properties for authoring, but do not claim Code Connect can generate production HTML until normalized code components exist.
- External theme vs duplicated tokens: use the existing Reuben theme dependency; do not copy brand colors or typography into this file.
- Current guide components vs local ownership: use the guide as reference, then create local editable components so the new file can be published independently.

## Acceptance criteria

- All local layout variables have explicit scopes and WEB code syntax.
- Every public component includes desktop and mobile behavior represented in the source.
- All visual properties use either the Reuben theme dependency or local email-layout variables.
- Each component passes structure and screenshot validation.
- Code Connect points to the new published component IDs only after review.
