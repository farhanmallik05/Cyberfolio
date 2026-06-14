import { test, expect } from '@playwright/test';

test.describe('API Endpoint Health Checks', () => {
  const getEndpoints = [
    '/api/rss'
    // Other endpoints might require POST or authentication
  ];

  for (const endpoint of getEndpoints) {
    test(`GET ${endpoint} responds properly`, async ({ request }) => {
      const response = await request.get(endpoint);
      // We don't mind 401s or 400s, just ensuring it's not a 500 internal server crash
      expect(response.status()).toBeLessThan(500);
    });
  }

  const postEndpoints = [
    '/api/chat',
    '/api/checkout',
    '/api/contact',
    '/api/newsletter',
    '/api/tools/prompt',
    '/api/tools/roast',
  ];

  for (const endpoint of postEndpoints) {
    test(`POST ${endpoint} responds properly without crashing`, async ({ request }) => {
      // Send empty or basic invalid payload
      const response = await request.post(endpoint, {
        data: {}
      });
      // We expect 400 Bad Request or 401 Unauthorized, but not 500
      expect(response.status()).toBeLessThan(500);
    });
  }
});
