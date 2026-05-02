import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  DEFAULT_OUTPUT_PATH,
  copyAnswerWithRetries,
  parseArgs,
  retryOperation,
} from './perplexity-core.js';

test('parseArgs keeps the existing default output path', () => {
  assert.deepEqual(parseArgs(['What is Perplexity?']), {
    prompt: 'What is Perplexity?',
    outputPath: DEFAULT_OUTPUT_PATH,
  });
});

test('parseArgs accepts an explicit output path', () => {
  assert.deepEqual(parseArgs(['What is Perplexity?', '/tmp/perplexity.md']), {
    prompt: 'What is Perplexity?',
    outputPath: '/tmp/perplexity.md',
  });
});

test('parseArgs rejects a missing prompt with the existing usage text', () => {
  assert.throws(
    () => parseArgs([]),
    /Usage: node scripts\/perplexity-query\.js "<query>" \[output-path\]/,
  );
});

test('retryOperation returns immediately on first success', async () => {
  let attempts = 0;

  const result = await retryOperation(async () => {
    attempts += 1;
    return 'answer';
  }, { attempts: 3, delayMs: 0 });

  assert.equal(result, 'answer');
  assert.equal(attempts, 1);
});

test('retryOperation retries transient failures before succeeding', async () => {
  let attempts = 0;

  const result = await retryOperation(async () => {
    attempts += 1;
    if (attempts < 3) {
      throw new Error(`temporary failure ${attempts}`);
    }
    return 'answer';
  }, { attempts: 3, delayMs: 0 });

  assert.equal(result, 'answer');
  assert.equal(attempts, 3);
});

test('retryOperation rethrows the last failure after all attempts', async () => {
  let attempts = 0;

  await assert.rejects(
    retryOperation(async () => {
      attempts += 1;
      throw new Error(`failure ${attempts}`);
    }, { attempts: 2, delayMs: 0 }),
    /failure 2/,
  );

  assert.equal(attempts, 2);
});

test('copyAnswerWithRetries preserves the happy path', async () => {
  let clicks = 0;
  const copyButton = {
    async click() {
      clicks += 1;
    },
  };
  const page = {
    async evaluate() {
      return 'copied answer';
    },
  };

  const text = await copyAnswerWithRetries(copyButton, page, {
    attempts: 3,
    settleMs: 0,
    sleep: async () => {},
  });

  assert.equal(text, 'copied answer');
  assert.equal(clicks, 1);
});

test('copyAnswerWithRetries retries an empty clipboard response', async () => {
  let clicks = 0;
  const clipboardReads = ['', 'copied answer'];
  const copyButton = {
    async click() {
      clicks += 1;
    },
  };
  const page = {
    async evaluate() {
      return clipboardReads.shift();
    },
  };

  const text = await copyAnswerWithRetries(copyButton, page, {
    attempts: 2,
    settleMs: 0,
    sleep: async () => {},
  });

  assert.equal(text, 'copied answer');
  assert.equal(clicks, 2);
});

test('copyAnswerWithRetries keeps the existing empty-response error', async () => {
  const copyButton = {
    async click() {},
  };
  const page = {
    async evaluate() {
      return '';
    },
  };

  await assert.rejects(
    copyAnswerWithRetries(copyButton, page, {
      attempts: 2,
      settleMs: 0,
      sleep: async () => {},
    }),
    /Perplexity copied an empty response\./,
  );
});
