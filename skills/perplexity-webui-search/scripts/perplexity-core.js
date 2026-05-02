import fs from 'node:fs/promises';
import path from 'node:path';

export const DEFAULT_OUTPUT_PATH = 'result.md';
export const USAGE = 'Usage: node scripts/perplexity-query.js "<query>" [output-path]';
export const PERPLEXITY_URL = 'https://www.perplexity.ai/';
export const EMPTY_RESPONSE_ERROR = 'Perplexity copied an empty response.';
export const COPY_BUTTON_TIMEOUT_ERROR = 'Timed out waiting for Perplexity copy button.';

// Perplexity can take time to generate full answers; keep the existing 2-minute wait.
export const COPY_BUTTON_TIMEOUT_MS = 120_000;
export const POLL_INTERVAL_MS = 5_000;
export const COPY_SETTLE_MS = 1_500;
export const COPY_RETRY_ATTEMPTS = 3;
export const COPY_RETRY_DELAY_MS = 1_000;

export function parseArgs(args) {
  const [prompt, outputPath = DEFAULT_OUTPUT_PATH] = args;

  if (!prompt) {
    throw new Error(USAGE);
  }

  return { prompt, outputPath };
}

export function createLogger(now = () => new Date()) {
  return (message) => {
    console.error(`[perplexity-webui-search ${now().toISOString()}] ${message}`);
  };
}

export async function sleep(ms) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function retryOperation(operation, options) {
  const {
    attempts,
    delayMs,
    sleep: sleepFn = sleep,
    onRetry = () => {},
  } = options;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await operation(attempt);
    } catch (error) {
      if (attempt === attempts) {
        throw error;
      }

      onRetry(error, attempt);
      if (delayMs > 0) {
        await sleepFn(delayMs);
      }
    }
  }

  throw new Error('retryOperation exhausted attempts unexpectedly.');
}

export async function waitForVisible(locator, options = {}) {
  const {
    timeoutMs = COPY_BUTTON_TIMEOUT_MS,
    pollIntervalMs = POLL_INTERVAL_MS,
    sleep: sleepFn = sleep,
    now = () => Date.now(),
    onPoll = () => {},
  } = options;
  const deadline = now() + timeoutMs;

  while (now() < deadline) {
    const visible = await locator.isVisible().catch(() => false);
    if (visible) {
      return;
    }

    onPoll();
    await sleepFn(pollIntervalMs);
  }

  throw new Error(COPY_BUTTON_TIMEOUT_ERROR);
}

export async function copyAnswerWithRetries(copyButton, page, options = {}) {
  const {
    attempts = COPY_RETRY_ATTEMPTS,
    retryDelayMs = COPY_RETRY_DELAY_MS,
    settleMs = COPY_SETTLE_MS,
    sleep: sleepFn = sleep,
    onRetry = () => {},
  } = options;

  return retryOperation(async () => {
    await copyButton.click();

    if (settleMs > 0) {
      await sleepFn(settleMs);
    }

    const text = await page.evaluate(async () => navigator.clipboard.readText());
    if (!text) {
      throw new Error(EMPTY_RESPONSE_ERROR);
    }

    return text;
  }, {
    attempts,
    delayMs: retryDelayMs,
    sleep: sleepFn,
    onRetry,
  });
}

export async function writeAnswer(outputPath, text) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, text, 'utf8');
}

export async function runPerplexityQuery(options) {
  const {
    chromium,
    prompt,
    outputPath,
    logger = () => {},
  } = options;

  logger('Launching Chromium.');
  const browser = await chromium.launch({
    headless: false,
    args: ['--disable-blink-features=AutomationControlled'],
  });
  const context = await browser.newContext();

  try {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    const page = await context.newPage();

    logger(`Opening ${PERPLEXITY_URL}.`);
    await page.goto(PERPLEXITY_URL);
    await page.locator('#ask-input').click();
    await page.locator('#ask-input').fill(prompt);
    await page.getByRole('button', { name: 'Submit' }).click();

    const copyButton = page.getByRole('button', { name: 'Copy', exact: true }).last();
    await waitForVisible(copyButton, {
      onPoll: () => logger('Waiting for Perplexity copy button.'),
    });

    const text = await copyAnswerWithRetries(copyButton, page, {
      onRetry: (error, attempt) => logger(`Copy attempt ${attempt} failed: ${error.message}`),
    });

    await writeAnswer(outputPath, text);
    logger(`Wrote answer to ${outputPath}.`);

    return text;
  } finally {
    await context.close();
    await browser.close();
  }
}
