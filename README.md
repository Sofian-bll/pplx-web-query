<div align="center">

# Perplexity WebUI Search Skill

Universal Agent Skill for querying Perplexity through the web UI with Playwright.

![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

</div>

## What is this?

This repository packages a portable Agent Skill that opens Perplexity in Chromium, submits a query, copies the generated answer, and writes it to Markdown. It is useful when an agent needs a browser-based Perplexity search path instead of repeated webpage fetches.

The canonical skill lives in `skills/perplexity-webui-search/`.

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
skills/
  perplexity-webui-search/
    references/
      install-codex.md
      install-claude.md
      install-opencode.md
      troubleshooting.md
    scripts/
      perplexity-core.js
      perplexity-core.test.mjs
      perplexity-query.js
    LICENSE
    README.md
    SKILL.md
    package.json
    package-lock.json
.gitignore
LICENSE
README.md
```

## OpenCode

Install from the repository root:

```bash
npx skills add ./skills --skill perplexity-webui-search --agent opencode --copy
```

Or copy `skills/perplexity-webui-search/` into an OpenCode skills discovery path such as:

```text
~/.config/opencode/skills/perplexity-webui-search/
```

After installation, start OpenCode and ask:

```text
Use the perplexity-webui-search skill to search Perplexity for "latest Playwright release notes" and summarize the result.
```

## Codex

Install from the repository root:

```bash
npx skills add ./skills --skill perplexity-webui-search --agent codex --copy
```

Or copy `skills/perplexity-webui-search/` into:

```text
${CODEX_HOME:-$HOME/.codex}/skills/perplexity-webui-search/
```

## Claude And Other Agents

Copy the full `skills/perplexity-webui-search/` directory into the skills directory used by your agent runtime. The skill follows the Agent Skills layout with `SKILL.md`, `scripts/`, and `references/`.

## Documentation

| Resource | Description |
|----------|-------------|
| [`skills/perplexity-webui-search/SKILL.md`](skills/perplexity-webui-search/SKILL.md) | Canonical Agent Skill instructions. |
| [`skills/perplexity-webui-search/README.md`](skills/perplexity-webui-search/README.md) | JavaScript package usage. |
| [`skills/perplexity-webui-search/references/install-opencode.md`](skills/perplexity-webui-search/references/install-opencode.md) | OpenCode installation and testing. |
| [`skills/perplexity-webui-search/references/install-codex.md`](skills/perplexity-webui-search/references/install-codex.md) | Codex installation and testing. |
| [`skills/perplexity-webui-search/references/install-claude.md`](skills/perplexity-webui-search/references/install-claude.md) | Claude-compatible installation notes. |
| [`skills/perplexity-webui-search/references/troubleshooting.md`](skills/perplexity-webui-search/references/troubleshooting.md) | Runtime failure modes and fixes. |
| [`skills/perplexity-webui-search/scripts/perplexity-core.test.mjs`](skills/perplexity-webui-search/scripts/perplexity-core.test.mjs) | Local regression tests for CLI parsing and retry behavior. |

## Limitations

- This uses the Perplexity web UI, not an official API.
- Chromium runs visibly with `headless: false` because the site can be sensitive to automation.
- Selectors may need updates if Perplexity changes its UI.

## Checks

Run from `skills/perplexity-webui-search/`:

```bash
npm test
npm run check
npm run pack:dry-run
```

## License

MIT License. See [`LICENSE`](LICENSE).
