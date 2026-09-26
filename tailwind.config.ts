import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFF6E8",
        ink: "#3F2A1D",
        cocoa: "#6B4630",
        coral: "#C2410C",
        peach: "#FFE4D2",
        sunflower: "#F5B942",
        leaf: "#0F766E",
        mist: "#E7F7F4",
        sky: "#314E9B",
        berry: "#BE3456",
      },
      fontFamily: {
        display: ["Fredoka", "ui-rounded", "Trebuchet MS", "sans-serif"],
        body: ["Nunito", "ui-rounded", "Trebuchet MS", "sans-serif"],
      },
      boxShadow: {
        card: "0 16px 40px rgba(63, 42, 29, 0.08)",
        pop: "0 8px 0 rgba(63, 42, 29, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
