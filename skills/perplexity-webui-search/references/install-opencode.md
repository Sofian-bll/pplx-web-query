# OpenCode Installation

OpenCode does not automatically discover this repository's `skills/` directory. Install or link the canonical skill into an OpenCode skills discovery path.

## Option 1: Install With Skills CLI

From the repository root:

```bash
npx skills add ./skills --skill perplexity-webui-search --agent opencode --copy
```

Use `--copy` for a standalone install. Omit `--copy` if you prefer symlinks and your environment supports them.

## Option 2: Manual Global Install

Copy the canonical skill directory:

```text
skills/perplexity-webui-search/
```

to one of OpenCode Skills' discovery paths:

```text
~/.config/opencode/skills/perplexity-webui-search/
~/.opencode/skills/perplexity-webui-search/
$OPENCODE_CONFIG_DIR/skills/perplexity-webui-search/
```

Keep the full directory, including `SKILL.md`, `scripts/`, `references/`, `package.json`, and `package-lock.json`.

## Option 3: Project-Local Install

If you want this skill only for one project, copy it to that project's local OpenCode skills path:

```text
<project>/.opencode/skills/perplexity-webui-search/
```

This repository intentionally does not commit `.opencode/`; it only provides the canonical skill under `skills/`.

## Test

Start OpenCode after installation and ask:

```text
Use the perplexity-webui-search skill to search Perplexity for "latest Playwright release notes" and summarize the result.
```

The agent should work from the installed skill directory, install dependencies if needed, run:

```bash
npm run search -- "latest Playwright release notes" ./result.md
```

then read `result.md` and summarize it.
