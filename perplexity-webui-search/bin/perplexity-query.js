#!/usr/bin/env node

const { chromium } = require('playwright');
const fs = require('node:fs/promises');
const path = require('node:path');

const prompt = process.argv[2];
const outputPath = process.argv[3] ?? 'result.md';

if (!prompt) {
  console.error('Usage: node bin/perplexity-query.js "<query>" [output-path]');
  process.exit(1);
}

(async () => {
  const browser = await chromium.launch({
    headless: false,
    args: ['--disable-blink-features=AutomationControlled'],
  });

  const context = await browser.newContext();
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const page = await context.newPage();

  try {
    await page.goto('https://www.perplexity.ai/');
    await page.locator('#ask-input').click();
    await page.locator('#ask-input').fill(prompt);
    await page.getByRole('button', { name: 'Submit' }).click();

    const copyButton = page.getByRole('button', { name: 'Copy', exact: true }).last();
    const deadline = Date.now() + 120_000;
    let foundCopyButton = false;

    while (Date.now() < deadline) {
      const visible = await copyButton.isVisible().catch(() => false);
      if (visible) {
        foundCopyButton = true;
        break;
      }
      await page.waitForTimeout(5000);
    }

    if (!foundCopyButton) {
      throw new Error('Timed out waiting for Perplexity copy button.');
    }

    await page.waitForTimeout(1500);
    await copyButton.click();

    const text = await page.evaluate(async () => navigator.clipboard.readText());
    if (!text) {
      throw new Error('Perplexity copied an empty response.');
    }

    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, text, 'utf8');

    console.log(text);
  } finally {
    await context.close();
    await browser.close();
  }
})();
