import type { Config } from "tailwindcss";

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
      }
    },
  },
  plugins: [],
};
export default config;
