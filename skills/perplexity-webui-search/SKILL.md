---
name: perplexity-webui-search
description: Use when the user asks to search Perplexity, query Perplexity through the web UI, perform web research with Perplexity, save a Perplexity answer as Markdown, or retrieve a Perplexity answer through browser automation.
license: MIT
compatibility: Requires Node.js 18+, Playwright Chromium, perplexity.ai network access, and browser launch permission.
metadata:
  version: "0.1.0"
---

# Perplexity WebUI Search

## Overview

This skill runs the bundled Playwright script against Perplexity's web UI and returns the copied Markdown answer. It is a browser automation path, not an official Perplexity API client.

## Use And Avoid

Use for explicit Perplexity tasks:

- Search Perplexity directly.
- Use Perplexity for research instead of generic webpage fetching.
- Retrieve or save a Perplexity answer through a visible browser session.

Do not use for:

- The user asks for a normal web fetch, URL extraction, or documentation lookup.
- The environment cannot open Chromium.
- Network access to `https://www.perplexity.ai/` is unavailable.
- The task requires an official Perplexity API.

## Workflow

1. Work from this skill directory, wherever it is installed.
2. If dependencies are missing, run `npm install`.
3. If Chromium is missing, run `npx playwright install chromium`.
4. Run the search command with the user query and an output path.
5. Read the output file before answering the user.
6. If the browser is blocked, times out, copies an empty response, or the UI changes, say that clearly and do not claim Perplexity was searched.

## Command

```bash
npm run search -- "<query>" ./result.md
```

The command opens visible Chromium, submits the query, waits for the final `Copy` button, writes the copied answer to the output file, and prints the answer to stdout. Progress logs go to stderr.

## Output Handling

- Default output path: `result.md`.
- Prefer a task-specific path such as `./tmp/perplexity-result.md` when the user asks to preserve output.
- `result.md` is generated output and should not be committed.
- Read the output file and summarize the answer; do not just report that the command ran.

## Response Pattern

- Success: summarize the Perplexity answer and include relevant citations copied in the output.
- Failure: state `Perplexity search did not complete: <concrete error>`. Do not invent an answer or fall back to generic web search unless the user asks.

## Common Mistakes

- Running from another directory without installing dependencies in this skill directory.
- Reporting success from stdout alone without reading the output file.
- Committing generated files such as `result.md` or files under `tmp/`.
- Treating this as an official Perplexity API client.

## Troubleshooting

If setup or runtime fails, read [references/troubleshooting.md](references/troubleshooting.md) and report the concrete failure. Do not claim Perplexity was searched unless the command produced a non-empty answer.
