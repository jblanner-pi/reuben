# Normalized Reuben Email Component API

## Design decision

Each public module produces one responsive HTML fragment. Desktop and mobile Figma variants are previews of the same output, not separate code branches. Responsive behavior is provided by the shared 480 px stylesheet and email-safe table classes.

The implementation is framework-independent JavaScript so it can be used by a build script, sending-platform integration, or a future wrapper. Every function returns an HTML string and validates required inputs before rendering.

## Public module matches proposed for Code Connect review

| Figma component | Code component | Source |
|---|---|---|
| `nl-header` (`57:10`) | `renderNlHeader` | `src/components/modules.js` |
| `1col_1post_full-width` (`61:69`) | `renderOneColumnOnePost` | `src/components/modules.js` |
| `2col_2post` (`68:136`) | `renderTwoColumnTwoPost` | `src/components/modules.js` |
| `3col_3post` (`75:387`) | `renderThreeColumnThreePost` | `src/components/modules.js` |

These are direct semantic matches: the Figma component set describes the module and its editable content, while the code function owns the responsive table implementation. `Viewport` is intentionally not a code input because one email fragment must respond in both desktop and mobile clients.

## Module inputs

### `renderNlHeader`

- `content`: `standard`, `logo-only`, or `image-only`
- `backgroundColor`: six-digit hex value; defaults to `#D9D9D9`
- `logo`: source URL, destination URL, alt text, and optional width
- `title` and optional `tagline`: used by Standard
- `image`: source URL, destination URL, and alt text used by Image-only

The header never renders a preheader. Compose `renderPreheaderLink` in a separate wrapper when required.

### `renderOneColumnOnePost`

- `post`: one normalized post object

### `renderTwoColumnTwoPost`

- optional `sectionTitle`
- `posts`: exactly two normalized post objects
- optional `links`: exactly three navigation links

### `renderThreeColumnThreePost`

- optional `sectionTitle`
- `posts`: exactly three normalized post objects
- optional `links`: exactly three navigation links

The three-column renderer always uses the 16 px compact rating treatment.

## Normalized post object

- required `headline` and destination `href`
- required image source and meaningful alt text
- optional `moniker`
- optional supporting `copy`
- optional rating with a 0–5 value and absolute URLs for transparent full, half, and empty PNG artwork
- zero to five supporting links
- optional CTA using the shared button renderer

## Safety rules implemented

- URLs must be absolute HTTP or HTTPS URLs.
- User-authored text is HTML escaped.
- Layout uses presentation tables; no flexbox or CSS grid.
- Desktop widths remain 700, 652, 314, and 201 px.
- The mobile breakpoint remains 480 px.
- CTA text is 16 px with a 48 px target height.
- Rating artwork is 16 or 20 px and explicitly transparent.
- The preheader primitive contains one centered link and owns no background or outer padding.
- Source snapshots remain unchanged.
