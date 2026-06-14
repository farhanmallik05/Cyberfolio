import { test, expect } from '@playwright/test';

test.describe.skip('Dodo Payments Checkout Flow', () => {
  test('should navigate to store, click buy, and redirect to Dodo Payments checkout', async ({ page }) => {
    // 1. Visit the store
    await page.goto('/store');

    // 2. Select a product and click Buy
    // Assuming we have a product card with a 'Buy Now' button
    const buyButton = page.locator('button:has-text("Buy Now")').first();
    await expect(buyButton).toBeVisible();
    await buyButton.click();

    // 3. Optional: If there's an interim email collection form before checkout
    // const emailInput = page.locator('input[type="email"]');
    // await expect(emailInput).toBeVisible();
    // await emailInput.fill('test@example.com');
    // await page.locator('button:has-text("Continue to Payment")').click();

    // 4. Assert redirect to Dodo Payments checkout domain
    await page.waitForURL(/^https:\/\/(checkout\.)?dodopayments\.com\//);
    const url = page.url();
    expect(url).toContain('dodopayments.com');
    
    // Note: We do not mock or automate the actual credit card payment in standard E2E.
    // Instead, we verify the handoff is successful. Webhooks are tested separately or via Dodo CLI.
  });

  test('should display success state upon redirect back from checkout', async ({ page }) => {
    // 1. Visit the success URL directly with mock parameters
    // In reality, Dodo redirects back here after successful payment
    await page.goto('/store/success?payment_id=mock_dodo_id_123');

    // 2. Verify success UI
    await expect(page.locator('text=Payment Successful')).toBeVisible();
    await expect(page.locator('text=Check your email')).toBeVisible();
  });
});
