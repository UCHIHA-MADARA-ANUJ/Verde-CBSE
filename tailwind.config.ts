import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#22c55e",
        verde: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        accent: {
          cyan: "#22d3ee",
          purple: "#a855f7",
          amber: "#f59e0b",
          rose: "#f43f5e",
        },
        dark: {
          900: "#000000",
          800: "#0a0a0a",
          700: "#111111",
          600: "#171717",
          500: "#1a1a1a",
        },
      },
      fontFamily: {
        sans: ["DM Sans Variable", "DM Sans", "system-ui", "sans-serif"],
        display: ["Manrope Variable", "Manrope", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
      animation: {
        scanline: "scanline 8s linear infinite",
        blink: "blink 6s infinite",
        "neon-pulse": "neon-pulse 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
        "marquee": "marquee 25s linear infinite",
        "marquee-reverse": "marquee-reverse 25s linear infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "glitch": "glitch 1s linear infinite",
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite",
        "slide-up": "slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "draw-line": "draw-line 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "blink-fast": "blink-fast 0.6s step-end infinite",
        "count-up": "count-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-150px)" },
          "100%": { transform: "translateY(calc(100vh + 150px))" },
        },
        blink: {
          "0%,100%": { opacity: "1" },
          "5%": { opacity: "0.1" },
          "7%": { opacity: "1" },
          "12%": { opacity: "0.2" },
          "15%": { opacity: "1" },
        },
        "blink-fast": {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "neon-pulse": {
          "0%,100%": { textShadow: "0 0 10px rgba(34,197,94,0.6), 0 0 20px rgba(34,197,94,0.3)" },
          "50%": { textShadow: "0 0 25px rgba(34,197,94,1), 0 0 45px rgba(34,197,94,0.6), 0 0 60px rgba(34,197,94,0.3)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0) rotate(0deg)" },
          "33%": { transform: "translateY(-12px) rotate(1deg)" },
          "66%": { transform: "translateY(6px) rotate(-0.5deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "gradient-shift": {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        glitch: {
          "2%,64%": { transform: "translate(2px,0) skew(0deg)" },
          "4%,60%": { transform: "translate(-2px,0) skew(0deg)" },
          "62%": { transform: "translate(0,0) skew(5deg)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.95)", boxShadow: "0 0 0 0 rgba(34,197,94,0.7)" },
          "70%": { transform: "scale(1)", boxShadow: "0 0 0 10px rgba(34,197,94,0)" },
          "100%": { transform: "scale(0.95)", boxShadow: "0 0 0 0 rgba(34,197,94,0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "draw-line": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        "count-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        neon: "0 0 5px rgba(34,197,94,0.5), 0 0 20px rgba(34,197,94,0.3)",
        "neon-lg": "0 0 10px rgba(34,197,94,0.6), 0 0 30px rgba(34,197,94,0.4), 0 0 60px rgba(34,197,94,0.2)",
        glass: "0 8px 32px 0 rgba(0,0,0,0.37)",
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "expo-in-out": "cubic-bezier(0.87, 0, 0.13, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
