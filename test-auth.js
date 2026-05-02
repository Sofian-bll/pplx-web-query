// test-profile.js
const { chromium } = require('playwright');

(async () => {
  const context = await chromium.launchPersistentContext('./chrome-profile', {
    executablePath: '/Applications/Helium.app/Contents/MacOS/Helium',
    headless: true,
  });

  const page = await context.newPage();
  await page.goto('https://www.perplexity.ai');

  // Laisse le temps à la page de charger
  await page.waitForTimeout(5000);

  const isLoggedIn = await page.locator('#ask-input').isVisible().catch(() => false);

  if (isLoggedIn) {
    console.log('✅ Profil OK — connecté automatiquement');
  } else {
    console.log('❌ Profil non chargé ou session expirée');
  }

  await page.waitForTimeout(3000); // laisse le browser ouvert 3s pour que tu voies
  await context.close();
})();