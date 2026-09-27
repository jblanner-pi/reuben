# Publishing the Reuben Code Connect Templates

## Current readiness

- Git remote: `https://github.com/jblanner-pi/reuben.git`
- Default branch: `main`
- CLI: `@figma/code-connect` 2.0.1, installed as a development dependency
- Templates: four parserless `.figma.ts` files under `code-connect/`
- CLI parse result: passing for all four templates
- Current Figma state: dynamic templates were published on 2026-09-26 and report `hasTemplate: true`, but they target the retired normalized-renderer experiment
- Proposed replacement: source-aware templates under `code-connect/` resolve canonical Reuben fragments through `src/reuben-framework.js`
- Publication status: pending mapping review; do not republish until approved

## Required Figma token

Create a Figma personal access token with:

- Code Connect: Write
- File content: Read

Keep the token outside the repository. Set it only in the terminal session used to publish:

```bash
export FIGMA_ACCESS_TOKEN="your-token"
```

## Validate

```bash
npm run code-connect:parse
npm run code-connect:preview
npm run code-connect:publish:dry-run
```

The dry run uses `--force` because the published renderer mappings will be replaced. It does not publish.

## Publish

```bash
npm run code-connect:publish
```

## Verify

1. Confirm the source-aware mapping proposal has been approved.
2. Open an instance of each public component in Figma.
3. Enter Dev Mode.
4. Select the instance.
5. Confirm that the Inspect panel references `loadReubenModule` or `resolveFigmaModule`, not the experimental renderers.
6. Verify the four connections report a stored template rather than a path-only mapping.

## Security

- Never commit a Figma token.
- Never paste a token into documentation, source code, command history shared with others, or chat.
- Revoke the token in Figma if it is exposed.
