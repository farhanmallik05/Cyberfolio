/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.dodopayments.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://avatars.githubusercontent.com https://raw.githubusercontent.com https://images.unsplash.com https://*.dodopayments.com; connect-src 'self' https://*.supabase.co https://*.dodopayments.com wss://*.dodopayments.com; frame-src 'self' https://*.dodopayments.com;",
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

export default nextConfig;
