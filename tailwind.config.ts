import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        futura: ["var(--font-futura)", "sans-serif"],
      },
      fontWeight: {
        normal: "400",
        bold: "700",
        extrablack: "900",
      },
    },
  },
  plugins: [],
};

export default config;
