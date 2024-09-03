import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/**/*{.js,.ts,.jsx,.tsx}",
  ],
  theme: {
    colors: {
      black: "#000000",
      white: "#FFFFFF",
      transparent: "transparent",
      primary: {
        500: "#0673FF",
        900: "#0E285D",
      },
      grey: {
        50: "#F9FAFB",
        75: "#F7F9FC",
        100: "#EBEBEB",
        300: "#D0D5DD",
        400: "#98A2B3",
        500: "#667185",
        800: "#1D2739",
        900: "#101928",
      },
      warning: {
        300: "#F5B546",
        400: "#F3A218",
      },
      error: {
        500: "#F83B3B",
      },
      success: {
        600: "#0C8921",
      },
    },
    fontSize: {
      h1: [
        "56px",
        {
          lineHeight: "56px",
          letterSpacing: "-0.02em",
          fontWeight: "600",
        },
      ],

      "4xl": [
        "36px",
        {
          lineHeight: "43.2px",
          letterSpacing: "-0.02em",
          fontWeight: "600",
        },
      ],
      h3: [
        "32px",
        {
          lineHeight: "38.4px",
          letterSpacing: "-0.02em",
          fontWeight: "700",
        },
      ],
      h4: [
        "28px",
        {
          lineHeight: "33.6px",
          letterSpacing: "-0.02em",
          fontWeight: "600",
        },
      ],
      xl: [
        "18px",
        {
          lineHeight: "26.1px",
          letterSpacing: "-0.02em",
          fontWeight: "500",
        },
      ],
      base: [
        "16px",
        {
          lineHeight: "23.2px",
          letterSpacing: "-0.02em",
          fontWeight: "400",
        },
      ],
      sm: [
        "14px",
        {
          lineHeight: "20.3px",
          letterSpacing: "-0.02em",
          fontWeight: "400",
        },
      ],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "footer-overlay": "url(/images/footer_bg.png)",
        "calculator-overlay": "url(/images/calculator_bg.png)",
      },
    },
  },
  plugins: [],
};
export default config;
