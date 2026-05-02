# Perplexity WebUI Search

Use this skill when you need to run a research query through Perplexity's web UI from a local browser session.

## Requirements

- Node.js 18 or newer
- Playwright browsers installed with `npx playwright install chromium`
- A network connection that can access `https://www.perplexity.ai/`

## Usage

From this directory:

```bash
npm install
npm run search -- "What changed in Playwright recently?" ./result.md
```

The command opens Chromium, submits the query to Perplexity, waits for the answer, clicks the final `Copy` button, writes the copied Markdown to the output file, and prints it to stdout.

## Notes

- The browser runs with `headless: false` because Perplexity can be sensitive to automation.
- The default output file is `result.md`.
- This uses the Perplexity web UI, not an official API.
- If Perplexity changes its DOM, selectors in `bin/perplexity-query.js` may need to be updated.
