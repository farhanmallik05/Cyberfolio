/* global console */
import http from 'http';

async function testRateLimit() {
  let successCount = 0;
  let rateLimitCount = 0;
  
  for (let i = 0; i < 12; i++) {
    await new Promise((resolve) => {
      const req = http.request(
        'http://localhost:8000/api/chat',
        { method: 'POST', headers: { 'x-forwarded-for': '123.45.67.89' } },
        (res) => {
          if (res.statusCode === 429) {
            rateLimitCount++;
          } else {
            successCount++;
          }
          res.on('data', () => {});
          res.on('end', resolve);
        }
      );
      req.on('error', (err) => {
        console.error('Request failed:', err.message);
        resolve();
      });
      req.write(JSON.stringify({ message: "test" }));
      req.end();
    });
  }

  console.log(`Test completed. Successes: ${successCount}, Rate limits (429): ${rateLimitCount}`);
}

testRateLimit();
