#!/usr/bin/env node

import { chromium } from 'playwright';

import { createLogger, parseArgs, runPerplexityQuery } from './perplexity-core.js';

try {
  const { prompt, outputPath } = parseArgs(process.argv.slice(2));
  const text = await runPerplexityQuery({
    chromium,
    prompt,
    outputPath,
    logger: createLogger(),
  });

  console.log(text);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
