---
name: perplexity-webui-search
description: Use when the user asks to search Perplexity, query Perplexity through the web UI, perform web research with Perplexity, or retrieve a Perplexity answer through browser automation.
license: MIT
compatibility: Requires Node.js 18+, Playwright Chromium, network access to perplexity.ai, and permission to open a browser.
metadata:
  version: "0.1.0"
---

# Perplexity WebUI Search

## Overview

This skill runs a local Playwright-powered browser query against Perplexity's web UI and returns the copied Markdown answer. Use it as a browser automation path, not as an official Perplexity API client.

## When To Use

Use this skill when the user asks to:

- Search Perplexity directly.
- Use Perplexity for research instead of generic webpage fetching.
- Retrieve a Perplexity answer through a visible browser session.
- Save a Perplexity answer to a Markdown file for later reading.

Do not use this skill when:

- The user asks for a normal web fetch, URL extraction, or documentation lookup.
- The environment cannot open Chromium.
- Network access to `https://www.perplexity.ai/` is unavailable.
- The task requires an official Perplexity API.

## Required Workflow

1. Work from this skill directory, wherever it is installed.
2. If dependencies are missing, run `npm install`.
3. If Chromium is missing, run `npx playwright install chromium`.
4. Run the search command with the user query and an output path.
5. Read the output file before answering the user.
6. Tell the user if the browser was blocked, timed out, copied an empty response, or if Perplexity's UI changed.

## Command

```bash
npm run search -- "<query>" ./result.md
```

The command opens Chromium, submits the query to Perplexity, waits for the final `Copy` button, writes the copied answer to the output file, and prints the answer to stdout.

## Output Handling

- Default output path: `result.md`.
- Prefer a task-specific path such as `./tmp/perplexity-result.md` when the user asks to preserve output.
- `result.md` is generated output and should not be committed.
- Read the output file and summarize the answer; do not just report that the command ran.

## Troubleshooting

If setup or runtime fails, read `references/troubleshooting.md` and report the concrete failure. Do not claim Perplexity was searched unless the command produced a non-empty answer.
