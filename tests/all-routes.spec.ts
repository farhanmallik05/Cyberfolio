import { test, expect } from '@playwright/test';

const routes = [
  '/',
  '/about',
  '/blog',
  '/certificates',
  '/chat',
  '/community',
  '/contact',
  '/courses',
  '/dsa',
  '/marketplace',
  '/newsletter',
  '/now',
  '/projects',
  '/resume',
  '/services',
  '/skills',
  '/social',
  '/tools'
];

for (const route of routes) {
  test(`Route ${route} should load successfully without errors`, async ({ page }) => {
    const response = await page.goto(route);
    
    // Assert successful response status (200 or 304 usually, or client side routing)
    expect(response?.status()).toBeLessThan(400);

    // Ensure there is no server-side Next.js error overlay visible
    const errorOverlay = page.locator('nextjs-portal');
    await expect(errorOverlay).toHaveCount(0);

    // Basic assertion to ensure page is loaded
    await expect(page).toHaveTitle(/Farhan Mallik|Neural Architect/i);
  });
}
