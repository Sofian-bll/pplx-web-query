# Codex Installation

Codex CLI supports skills under `${CODEX_HOME:-$HOME/.codex}/skills`.

## Option 1: Install With Skills CLI

From the repository root:

```bash
npx skills add ./skills --skill perplexity-webui-search --agent codex --copy
```

Use `--copy` for a standalone install. Omit `--copy` if you prefer symlinks and your environment supports them.

## Option 2: Manual Install

Copy the canonical skill directory:

```text
skills/perplexity-webui-search/
```

to:

```text
${CODEX_HOME:-$HOME/.codex}/skills/perplexity-webui-search/
```

The final structure should be:

```text
~/.codex/skills/perplexity-webui-search/
  SKILL.md
  scripts/
  references/
  package.json
  package-lock.json
```

## Test

Start Codex after installation and ask:

```text
Use the perplexity-webui-search skill to search Perplexity for "Agent Skills specification" and summarize the result.
```

The agent should work from the installed skill directory, install dependencies if needed, run the search command, read the output file, and summarize the result.

If browser automation fails, the agent should report the concrete error instead of claiming the search succeeded.
