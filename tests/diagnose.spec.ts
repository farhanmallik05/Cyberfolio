import { test, expect } from '@playwright/test';

test('diagnose homepage loading and animations', async ({ page }) => {
  page.on('console', msg => {
    console.log(`[BROWSER CONSOLE] [${msg.type()}] ${msg.text()}`);
  });

  page.on('pageerror', err => {
    console.error(`[BROWSER EXCEPTION] ${err.stack}`);
  });

  console.log("Navigating to http://localhost:8000/ ...");
  await page.goto('http://localhost:8000/');

  console.log("Waiting 15 seconds for loaders to complete...");
  await page.waitForTimeout(15000);

  console.log("Taking final screenshot...");
  await page.screenshot({ path: 'C:/Users/farhan/.gemini/antigravity-ide/brain/793e46ee-28d7-4906-b958-23e6f0d056f7/scratch/playwright_diagnose.png' });

  // Assert if hero title is visible
  const heroText = page.locator('text=FARHAN MALLIK');
  await expect(heroText).toBeVisible({ timeout: 2000 });
});
