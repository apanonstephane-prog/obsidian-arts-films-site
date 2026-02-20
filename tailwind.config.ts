import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          // Core backgrounds — from brand spec
          black:        "#050505",  // primary bg
          dark:         "#0B0B0B",  // surface
          charcoal:     "#111111",  // elevated surface
          grey:         "#1A1A1A",  // subtle surface / border
          muted:        "#2A2A2A",  // disabled / placeholder
          border:       "#1A1A1A",  // borders & dividers

          // Text hierarchy — from brand spec
          silver:       "#BFC3C9",  // muted / secondary text
          metal:        "#C7CBD1",  // metal accent
          light:        "#E0E3E8",  // body text
          white:        "#F2F2F2",  // primary text

          // Luxury accent — used sparingly
          gold:         "#C9A96E",
          "gold-light": "#E8C98A",
          "gold-dark":  "#A07840",
        },
      },
      fontFamily: {
        sans:    ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "Georgia", "serif"],
      },
      letterSpacing: {
        "ultra-wide": "0.25em",
        "mega-wide":  "0.4em",
      },
      animation: {
        "fade-in":  "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.8s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":  "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
