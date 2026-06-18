import type { Config } from "tailwindcss";
import tailwindTypography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#05070D",
        foreground: "#F0F6FC",
        mech: {
          base: "#05070D",     // Deep Space Black
          panel: "#0D1117",    // Graphite Black
          navy: "#0B1320",     // Dark Navy
          blue: "#00AEEF",     // Electric Blue
          cyan: "#0FD3FF",     // Cyan Steel
          silver: "#C9D1D9",   // Silver
          gray: "#8B949E",     // Metallic Gray
          white: "#F0F6FC",    // Soft White
        }
      },
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        'metallic-gradient': 'linear-gradient(135deg, #0D1117 0%, #161b22 100%)',
      },
      typography: {
        mech: {
          css: {
            '--tw-prose-body': 'var(--text)',
            '--tw-prose-headings': 'var(--text)',
            '--tw-prose-lead': 'color-mix(in srgb, var(--text) 80%, transparent)',
            '--tw-prose-links': 'var(--neon)',
            '--tw-prose-bold': 'var(--text)',
            '--tw-prose-counters': 'color-mix(in srgb, var(--text) 60%, transparent)',
            '--tw-prose-bullets': 'var(--neon)',
            '--tw-prose-hr': 'color-mix(in srgb, var(--text) 20%, transparent)',
            '--tw-prose-quotes': 'var(--neon)',
            '--tw-prose-quote-borders': 'var(--neon)',
            '--tw-prose-captions': 'color-mix(in srgb, var(--text) 60%, transparent)',
            '--tw-prose-code': 'var(--neon2)',
            '--tw-prose-pre-code': 'color-mix(in srgb, var(--text) 90%, transparent)',
            '--tw-prose-pre-bg': 'var(--bg2)',
            '--tw-prose-th-borders': 'color-mix(in srgb, var(--text) 30%, transparent)',
            '--tw-prose-td-borders': 'color-mix(in srgb, var(--text) 20%, transparent)',
            h1: {
              fontFamily: 'var(--font-orbitron)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            },
            h2: {
              fontFamily: 'var(--font-orbitron)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            },
            h3: {
              fontFamily: 'var(--font-orbitron)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            },
            h4: {
              fontFamily: 'var(--font-orbitron)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            },
            code: {
              fontFamily: 'monospace',
              backgroundColor: 'color-mix(in srgb, var(--bg2) 50%, transparent)',
              padding: '0.2rem 0.4rem',
              borderRadius: '0.25rem',
              border: '1px solid color-mix(in srgb, var(--neon) 20%, transparent)',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              border: '1px solid color-mix(in srgb, var(--text) 10%, transparent)',
              borderRadius: '0.5rem',
            },
            a: {
              textDecoration: 'none',
              borderBottom: '1px solid var(--neon)',
              transition: 'border-bottom-color 0.2s',
              '&:hover': {
                borderBottomColor: 'transparent',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    tailwindTypography,
  ],
};
export default config;
