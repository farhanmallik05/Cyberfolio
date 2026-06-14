import crypto from 'crypto';

// Use a secure fallback if environment variable is missing
const SESSION_SECRET = process.env.JWT_SECRET || process.env.ADMIN_PASSWORD || 'default_secure_session_secret_key_998811';

/**
 * Signs a payload with HMAC SHA-256 to create a secure session token.
 */
export function signSession(payload: string): string {
  const hmac = crypto.createHmac('sha256', SESSION_SECRET);
  hmac.update(payload);
  const signature = hmac.digest('hex');
  return `${payload}.${signature}`;
}

/**
 * Verifies the signature of a session token.
 * Uses constant-time comparison to prevent timing attacks.
 */
export function verifySession(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  
  const [payload, signature] = parts;
  
  const hmac = crypto.createHmac('sha256', SESSION_SECRET);
  hmac.update(payload);
  const expectedSignature = hmac.digest('hex');
  
  // Prevent timing attacks
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);
  
  if (signatureBuffer.length !== expectedBuffer.length) {
    return false;
  }
  
  const isSignatureValid = crypto.timingSafeEqual(signatureBuffer, expectedBuffer);
  return isSignatureValid && payload === 'authorized';
}
