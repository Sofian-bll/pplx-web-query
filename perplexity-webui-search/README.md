# Perplexity WebUI Search

Small Node.js helper for querying Perplexity through the browser UI with Playwright.

## Install

```bash
npm install
npx playwright install chromium
```

## Usage

```bash
npm run search -- "Explain browser automation detection" ./result.md
```

The script writes the copied Perplexity answer to `result.md` by default and also prints the answer to stdout.

## Limitations

- Uses browser automation against the Perplexity web UI, not an official API.
- Runs Chromium visibly with `headless: false` for better reliability.
- Depends on current Perplexity selectors such as `#ask-input` and the `Copy` button.
