/* global process */
import NextBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.dodopayments.com https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://avatars.githubusercontent.com https://raw.githubusercontent.com https://images.unsplash.com https://*.dodopayments.com; connect-src 'self' https://*.supabase.co https://*.dodopayments.com wss://*.dodopayments.com https://challenges.cloudflare.com; frame-src 'self' https://*.dodopayments.com https://challenges.cloudflare.com;",
                    }
                ],
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: '*.supabase.co',
            }
        ],
    },
};

import { withSentryConfig } from '@sentry/nextjs';

export default withSentryConfig(
  withBundleAnalyzer(nextConfig),
  {
    silent: true,
    org: "neural-architect",
    project: "portfolio"
  },
  {
    widenClientFileUpload: true,
    transpileClientSDK: true,
    tunnelRoute: "/monitoring",
    hideSourceMaps: true,
    disableLogger: true,
  }
);
