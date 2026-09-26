# Publishing the Reuben Code Connect Templates

## Current readiness

- Git remote: `https://github.com/jblanner-pi/reuben.git`
- Default branch: `main`
- CLI: `@figma/code-connect` 2.0.1, installed as a development dependency
- Templates: four parserless `.figma.ts` files under `code-connect/`
- CLI parse result: passing for all four templates
- Current Figma state: path mappings exist under the `Javascript` label; the CLI must replace them with dynamic templates

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

The dry run uses `--force` because the existing MCP-created path mappings must be replaced. It does not publish.

## Publish

```bash
npm run code-connect:publish
```

## Verify

1. Open an instance of each public component in Figma.
2. Enter Dev Mode.
3. Select the instance.
4. Confirm that the Inspect panel shows the dynamic renderer snippet.
5. Verify the four connections report a stored template rather than a path-only mapping.

## Security

- Never commit a Figma token.
- Never paste a token into documentation, source code, command history shared with others, or chat.
- Revoke the token in Figma if it is exposed.
