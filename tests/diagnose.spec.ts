import { test, expect } from '@playwright/test';

test('diagnose homepage loading and animations', async ({ page }) => {
  page.on('console', msg => {
    console.log(`[BROWSER CONSOLE] [${msg.type()}] ${msg.text()}`);
  });

  page.on('pageerror', err => {
    console.error(`[BROWSER EXCEPTION] ${err.stack}`);
  });

  console.log("Navigating to homepage...");
  await page.goto('/');

  console.log("Waiting 15 seconds for loaders to complete...");
  await page.waitForTimeout(15000);

  console.log("Taking final screenshot...");
  await page.screenshot({ path: './test-results/playwright_diagnose.png' });

  // Assert if hero title is visible
  const heroText = page.locator('text=FARHAN MALLIK').first();
  await expect(heroText).toBeVisible({ timeout: 2000 });
});
