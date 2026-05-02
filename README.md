<div align="center">

# Perplexity Headless Skill

Query Perplexity through the web UI from an AI skill using Playwright.

![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

</div>

## What is this?

This repository packages a working JavaScript skill helper that opens Perplexity in Chromium, submits a query, copies the generated answer, and writes it to Markdown. It is useful when an agent needs a browser-based Perplexity search path instead of repeated webpage fetches.

The Python version is preserved as an unfinished prototype only. Use `perplexity-webui-search/` for the working implementation.

## Quick Start

```bash
cd perplexity-webui-search
npm install
npx playwright install chromium
npm run search -- "What are the latest Playwright browser automation changes?" ./result.md
```

The command opens Chromium, sends the prompt to Perplexity, writes the copied answer to `result.md`, and prints the answer to stdout.

## Project Structure

```text
perplexity-webui-search/
  bin/
    perplexity-query.js
  README.md
  SKILL.md
  package.json
  package-lock.json
python-unfinished/
  README.md
  query-perplexity.py
.gitignore
LICENSE
README.md
```

## Documentation

| Resource | Description |
|----------|-------------|
| [`perplexity-webui-search/SKILL.md`](perplexity-webui-search/SKILL.md) | Skill instructions and runtime notes. |
| [`perplexity-webui-search/README.md`](perplexity-webui-search/README.md) | JavaScript package usage. |
| [`python-unfinished/README.md`](python-unfinished/README.md) | Status of the unfinished Python prototype. |

## Limitations

- This uses the Perplexity web UI, not an official API.
- Chromium runs visibly with `headless: false` because the site can be sensitive to automation.
- Selectors may need updates if Perplexity changes its UI.
- The Python prototype is intentionally not treated as a supported implementation.

## License

MIT License. See [`LICENSE`](LICENSE).
