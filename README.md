<div align="center">

# Perplexity WebUI Search Skill

Universal Agent Skill for querying Perplexity through the web UI with Playwright.

![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

</div>

## What is this?

This repository packages a portable Agent Skill that opens Perplexity in Chromium, submits a query, copies the generated answer, and writes it to Markdown. It is useful when an agent needs a browser-based Perplexity search path instead of repeated webpage fetches.

The canonical skill lives in `skills/perplexity-webui-search/`. The Python version is preserved as an unfinished prototype only.

## Quick Start

```bash
cd skills/perplexity-webui-search
npm install
npx playwright install chromium
npm run search -- "What are the latest Playwright browser automation changes?" ./result.md
```

The command opens Chromium, sends the prompt to Perplexity, writes the copied answer to `result.md`, and prints the answer to stdout.

## Project Structure

```text
.opencode/
  skills/
    perplexity-webui-search/
      SKILL.md
skills/
  perplexity-webui-search/
    references/
      install-claude.md
      install-opencode.md
      troubleshooting.md
    scripts/
      perplexity-query.js
    LICENSE
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

## OpenCode Testing

This repo includes a project-local OpenCode adapter in `.opencode/skills/perplexity-webui-search/`. Start OpenCode from the repository root and ask:

```text
Use the perplexity-webui-search skill to search Perplexity for "latest Playwright release notes" and summarize the result.
```

The adapter points OpenCode to the canonical skill in `skills/perplexity-webui-search/`.

## Claude And Other Agents

Copy the full `skills/perplexity-webui-search/` directory into the skills directory used by your agent runtime. The skill follows the Agent Skills layout with `SKILL.md`, `scripts/`, and `references/`.

## Documentation

| Resource | Description |
|----------|-------------|
| [`skills/perplexity-webui-search/SKILL.md`](skills/perplexity-webui-search/SKILL.md) | Canonical Agent Skill instructions. |
| [`skills/perplexity-webui-search/README.md`](skills/perplexity-webui-search/README.md) | JavaScript package usage. |
| [`skills/perplexity-webui-search/references/install-opencode.md`](skills/perplexity-webui-search/references/install-opencode.md) | OpenCode installation and local testing. |
| [`skills/perplexity-webui-search/references/install-claude.md`](skills/perplexity-webui-search/references/install-claude.md) | Claude-compatible installation notes. |
| [`skills/perplexity-webui-search/references/troubleshooting.md`](skills/perplexity-webui-search/references/troubleshooting.md) | Runtime failure modes and fixes. |
| [`python-unfinished/README.md`](python-unfinished/README.md) | Status of the unfinished Python prototype. |

## Limitations

- This uses the Perplexity web UI, not an official API.
- Chromium runs visibly with `headless: false` because the site can be sensitive to automation.
- Selectors may need updates if Perplexity changes its UI.
- The Python prototype is intentionally not treated as a supported implementation.

## License

MIT License. See [`LICENSE`](LICENSE).
