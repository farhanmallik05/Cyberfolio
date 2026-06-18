import { test, expect } from '@playwright/test';

test.describe('Dodo Payments Checkout Flow', () => {
  test.beforeEach(async ({ context }) => {
    // Pre-populate localStorage to bypass animation and layout boot loaders
    await context.addInitScript(() => {
      window.localStorage.setItem('hasBooted', 'true');
      window.localStorage.setItem('na-loader-shown', 'true');
    });
  });

  test('should navigate to store, view product, click checkout, and redirect to Dodo Payments', async ({ page }) => {
    // Mock the external checkout page redirect
    await page.route('**/*', (route) => {
      const url = route.request().url();
      if (url.includes('dodopayments.com')) {
        return route.fulfill({
          status: 200,
          contentType: 'text/html',
          body: '<h1>Mock Dodo Payments Checkout Page</h1>',
        });
      }
      return route.continue();
    });

    // 1. Visit the store
    await page.goto('/store');

    // 2. Select a product and click View
    const viewButton = page.locator('a:has-text("View")').first();
    await expect(viewButton).toBeVisible();
    await viewButton.click();

    // 3. Confirm we are on the product page, fill email, and click checkout
    // Target the specific email input inside the checkout form, not the footer newsletter input
    const emailInput = page.locator('form input[name="email"]');
    await expect(emailInput).toBeVisible();
    await emailInput.fill('buyer@example.com');

    const checkoutButton = page.locator('button:has-text("SECURE CHECKOUT"), button:has-text("CLAIM NOW")').first();
    await expect(checkoutButton).toBeVisible();
    await checkoutButton.click();

    // 4. Assert redirect to Dodo Payments checkout domain
    await page.waitForURL(/^https:\/\/(checkout\.)?dodopayments\.com\//);
    const url = page.url();
    expect(url).toContain('dodopayments.com');
  });

  test('should display success state upon redirect back from checkout', async ({ page }) => {
    // 1. Visit the success URL directly with mock parameters
    await page.goto('/store/success?payment_id=mock_dodo_id_123');

    // 2. Verify success UI
    await expect(page.locator('text=TRANSACTION SECURED').first()).toBeVisible({ timeout: 5000 });
  });
});
