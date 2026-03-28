import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Palette from Neon Observatory Design System
        "surface": "#11131e",
        "surface-container-low": "#191b26",
        "surface-container": "#1d1f2b",
        "surface-container-high": "#272935",
        "surface-container-highest": "#323440",
        "surface-variant": "#323440",
        "on-surface": "#e1e1f2",
        "on-surface-variant": "#c9c4d7",
        
        "primary": "#c9bfff",
        "primary-container": "#5b3fd4",
        "on-primary-container": "#d7ceff",
        "secondary-container": "#4720ca",
        "on-secondary-container": "#baaeff",
        
        "outline": "#938ea0",
        "outline-variant": "#484554",
        
        "error": "#ffb4ab",
        "success": "#c9bfff", // Using secondary as specified for positive trends
        
        "brand-primary": "#5b3fd4",
        "brand-secondary": "#7b61ff",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        headline: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-md": ["1.75rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }],
        "title-sm": ["1.0rem", { lineHeight: "1.5", fontWeight: "500" }],
        "body-md": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
        "label-sm": ["0.6875rem", { lineHeight: "1.5", letterSpacing: "0.05em", fontWeight: "600" }],
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem",
        "card": "12px",
        "input": "8px",
        "pill": "20px",
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(135deg, #5b3fd4 0%, #baaeff 100%)",
      },
      backdropBlur: {
        "xs": "2px",
      },
    },
  },
  plugins: [],
} satisfies Config;
