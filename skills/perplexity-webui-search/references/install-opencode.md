# OpenCode Installation

This repository includes a project-local OpenCode adapter at `.opencode/skills/perplexity-webui-search/SKILL.md`.

## Test Locally

1. Start OpenCode from the repository root.
2. Ask OpenCode to use the skill explicitly:

```text
Use the perplexity-webui-search skill to search Perplexity for "latest Playwright release notes" and summarize the result.
```

3. The agent should run commands from `skills/perplexity-webui-search/`.
4. If dependencies are missing, the agent should run:

```bash
npm install
npx playwright install chromium
```

5. The search command is:

```bash
npm run search -- "latest Playwright release notes" ./result.md
```

## Global Installation

For global use, copy the canonical skill directory to an OpenCode skills path supported by your setup, such as:

```text
~/.config/opencode/skills/perplexity-webui-search/
```

Keep the full directory, including `SKILL.md`, `scripts/`, `references/`, `package.json`, and `package-lock.json`.
