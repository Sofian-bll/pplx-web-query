# Troubleshooting

## `Timed out waiting for Perplexity copy button.`

The script did not see Perplexity's final `Copy` button within two minutes.

Likely causes:

- Perplexity changed its UI labels or selectors.
- The query is still generating.
- The page is blocked by login, rate limiting, captcha, or consent UI.
- Network access is slow or unavailable.

What to do:

1. Re-run the command and watch the visible Chromium window.
2. Check whether `#ask-input` still exists.
3. Check whether the final answer has a button named `Copy`.
4. Update `scripts/perplexity-query.js` if Perplexity changed its DOM.

## `Perplexity copied an empty response.`

The script clicked the `Copy` button, but the clipboard was empty.

Likely causes:

- Clipboard permission was denied by the browser or OS.
- The selected button was not the final answer's copy action.
- Perplexity rendered an empty or blocked response.

What to do:

1. Re-run with the browser visible and inspect which button is clicked.
2. Confirm the browser grants `clipboard-read` and `clipboard-write` permissions.
3. Try a simpler query to rule out a blocked or failed Perplexity response.

## Chromium Is Missing

Run from the skill directory:

```bash
npx playwright install chromium
```

## Dependencies Are Missing

Run from the skill directory:

```bash
npm install
```

## Perplexity Requires Login Or Blocks Automation

This skill uses the web UI, not an official API. If Perplexity requires login, captcha, or blocks browser automation, report that limitation to the user. Do not claim a search succeeded unless the command produced a non-empty answer.
