import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FBF8F2",
        card: "#FFFFFF",
        ink: "#1F2A37",
        muted: "#5B6472",
        line: "#E6E0D4",
        brand: { DEFAULT: "#2F6F6A", dark: "#245652", soft: "#E3F0EE" },
        sun: { DEFAULT: "#E9A23B", soft: "#FBEFD9" },
        good: "#2E7D4F",
        bad: "#B54A3C",
        mark: "#FFF1A8",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        serif: ["Georgia", "Cambria", "'Times New Roman'", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
