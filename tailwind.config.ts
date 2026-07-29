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
        primary: {
          50: "#eef3fb",
          100: "#d4e1f5",
          200: "#a9c3eb",
          300: "#7da5e0",
          400: "#5287d6",
          500: "#3e71b2",
          600: "#325a8e",
          700: "#26446b",
          800: "#192d47",
          900: "#0d1724",
        },
        medical: {
          light: "#f0f4f8",
          DEFAULT: "#e2e8f0",
          dark: "#94a3b8",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
      },
    },
  },
  plugins: [],
};

export default config;
