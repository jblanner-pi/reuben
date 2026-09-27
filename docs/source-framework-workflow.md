# Reuben Source-Framework Workflow

## Decision

The existing Reuben base template and HTML fragments are the production source of truth. Phase 4 automation selects and composes those files; it does not reconstruct their table markup in a second renderer.

The files under `source/reuben/` remain read-only. Any future production correction must first be approved for the upstream Reuben system, then imported as a new snapshot. Local automation may report gaps, but it must not silently rewrite them.

## Assembly flow

1. Read `mapping/reuben-source-catalog.json`.
2. Resolve each requested module to an existing file under `source/reuben/`.
3. Extract only the module document's `<body>` contents. The extracted HTML is otherwise unchanged.
4. Insert the fragments between `<!--Insert Modules Below-->` and `<!--Reuben Footer-->` in the canonical base template.
5. Preserve provenance comments around every inserted fragment.
6. Run structural checks and report inherited source warnings separately from assembly failures.
7. Submit the resulting complete document to Email on Acid.

The implementation lives in `src/reuben-framework.js`. It is intentionally small: file resolution, body extraction, marker-based composition, and Figma-to-source lookup.

## Source fidelity contract

- No generated table structure replaces an existing Reuben fragment.
- No flexbox or CSS grid is introduced.
- Outlook conditionals, VML, inline styles, widths, and responsive classes remain byte-for-byte identical inside extracted bodies.
- The base template owns the shared CSS, 480 px breakpoint, outer wrapper, and footer.
- The assembly process fails on unknown components or missing markers.
- Design states without exact source support remain explicit gaps.

## Current Figma-to-source coverage

| Figma component | Canonical source | Status |
|---|---|---|
| `nl-header / Standard` | `reuben-header-solid-bg.html` | Legacy source exists, but includes a bundled preheader that the current component excludes |
| `nl-header / Logo-only` | None | Design-only gap |
| `nl-header / Image-only` | `reuben-header-image-bg.html` is the nearest pattern | Design-only gap; existing source overlays artwork rather than rendering one full-width image |
| `1col_1post_full-width` | `reuben-1col-1post-full-width.html` | Exact legacy source |
| `2col_2post` | `reuben-2col-2post.html` | Exact legacy source |
| `3col_3post` | `reuben-3col-3post.html` | Legacy source exists; 24 px stars conflict with the current 16 px design contract |

## Content authoring

The current Phase 4 baseline intentionally preserves legacy placeholder content, empty authoring links, and existing asset URLs. This establishes rendering fidelity before adding content substitution.

After the source-backed fixtures pass client QA, add a controlled authoring layer. That layer should target explicitly cataloged fields and must not perform unconstrained search-and-replace across HTML. Candidate fields include headlines, copy, image URL and alt text, destination URLs, CTA labels, section titles, and approved brand tokens.

## Retired experimental path

`src/components/`, `src/email-document.js`, and `src/styles/reuben-email.css` contain the earlier normalized-renderer experiment. They remain in the repository for comparison but are not part of the Phase 4 production path. Do not extend or publish those renderers unless the team later chooses a generated-component architecture.
