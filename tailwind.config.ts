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
        background: "#0D0F1A",
        surface: "#151729",
        brand: {
          primary: "#5B3FD4",
          secondary: "#7B61FF",
        },
        success: "#1D9E75",
        warning: "#EF9F27",
        danger: "#E24B4A",
        text: {
          primary: "#FFFFFF",
          secondary: "#8B8FA8",
        },
        border: "#1E2035",
      },
      borderRadius: {
        card: "12px",
        input: "8px",
        pill: "20px",
      },
    },
  },
  plugins: [],
} satisfies Config;
