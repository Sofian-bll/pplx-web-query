const {chromium} = require('playwright');
const fs = require("node:fs/promises");

(async () => {
  const browser = await chromium.launch({headless: false, args: ['--disable-blink-features=AutomationControlled']});
  const context = await browser.newContext();
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const page = await context.newPage();

  await page.goto('https://www.perplexity.ai/');

  const prompt = process.argv[2];
  await page.locator('#ask-input').click();
  await page.locator('#ask-input').fill(prompt);
  await page.getByRole('button', {name: 'Submit'}).click();

  // Retry toutes les 5s, max 2 min
  const copyBtn = page.getByRole('button', {name: 'Copy', exact: true}).last();
  const deadline = Date.now() + 120_000;
  while (Date.now() < deadline) {
    const visible = await copyBtn.isVisible().catch(() => false);
    if (visible) break;
    await page.waitForTimeout(5000);
  }

  // Sécurité : 1.5s pour que le rendu soit stable
  await page.waitForTimeout(1500);
  await copyBtn.click();

  const text = await page.evaluate(async () => {
    return await navigator.clipboard.readText();
  });

  await fs.writeFile('result.md', text ?? '', 'utf8');

  await context.close();
  await browser.close();
})();