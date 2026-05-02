# Perplexity WebUI Search

Portable Agent Skill for querying Perplexity through the browser UI with Playwright.

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

Progress logs are written to stderr so stdout remains the copied Perplexity answer.

## Checks

```bash
npm test
npm run check
npm run pack:dry-run
```

## Agent Skill

`SKILL.md` follows the Agent Skills directory format and can be used by compatible agents. Install this directory into your agent's skills path, or use `npx skills add` from the repository root.

## References

- `references/install-opencode.md`
- `references/install-claude.md`
- `references/install-codex.md`
- `references/troubleshooting.md`

## Limitations

- Uses browser automation against the Perplexity web UI, not an official API.
- Runs Chromium visibly with `headless: false` for better reliability.
- Depends on current Perplexity selectors such as `#ask-input` and the `Copy` button.
