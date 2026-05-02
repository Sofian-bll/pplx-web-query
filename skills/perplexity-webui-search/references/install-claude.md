# Claude Installation

This skill follows the Agent Skills directory format:

```text
perplexity-webui-search/
  SKILL.md
  scripts/
  references/
```

To install it for a Claude-compatible environment, copy the full canonical skill directory:

```text
skills/perplexity-webui-search/
```

into the skills directory used by that environment.

After installation, ask the agent for a Perplexity search explicitly:

```text
Use the perplexity-webui-search skill to search Perplexity for "Agent Skills specification" and summarize the result.
```

The agent should install dependencies if needed, run the local script, read the output file, and summarize the result. If the browser automation fails, it should report the concrete error instead of claiming the search succeeded.
