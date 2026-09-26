# Repository instructions

## Purpose

This is an isolated pilot for a responsive HTML email component system and Figma Code Connect mappings.

## Source snapshots

- Treat every file under `source/reuben/` as read-only imported reference material.
- Do not edit, rename, move, or delete snapshot files.
- Implement normalized components under `src/` and mappings under `code-connect/`.

## Email requirements

- Preserve email-safe table markup, inline styles, Microsoft conditional comments, VML, and tested client workarounds.
- Do not introduce flexbox or grid into generated email HTML.
- Preserve 700px desktop containers, 24px standard gutters, responsive behavior, and accessible presentation-table semantics unless a verified requirement supersedes them.
- Treat Figma output as design reference, not production-ready web code.
- Validate component changes against the supported email-client matrix before calling them complete.

## Code Connect

- Code Connect files must use parserless `.figma.ts` templates with `figma.code`.
- Never create `.figma.tsx` files or use `figma.connect()` in this repository.
- Do not publish mappings until the proposed code-component matches have been reviewed.
