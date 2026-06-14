import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';
import { checkRateLimit } from '@/lib/rate-limit';

/**
 * Next.js 16 Proxy (formerly "middleware").
 * Handles rate limiting for LLM-powered API routes and Supabase session refreshing.
 */
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Enforce IP-based rate limiting on LLM API endpoints
  const rateLimitedRoutes: Record<string, string> = {
    '/api/chat': 'chat',
    '/api/tools/prompt': 'prompt-optimizer',
    '/api/tools/roast': 'portfolio-roaster',
  };

  if (rateLimitedRoutes[pathname]) {
    const toolName = rateLimitedRoutes[pathname];
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const limitCheck = await checkRateLimit(ip, toolName, 10, 24);
    if (!limitCheck.allowed) {
      return NextResponse.json(
        { error: `Rate limit exceeded. Maximum 10 requests per 24 hours.` },
        { status: 429 }
      );
    }
  }

  // Delegate to Supabase session management
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - Static image/media assets
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
