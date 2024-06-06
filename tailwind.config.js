/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        spaceGrotesk: ["Space Grotesk", "sans-serif"],
      },
      colors: {
        primary50: "#eff8ff",
        primary100: "#dff0ff",
        primary200: "#b7e2ff",
        primary300: "#77cbff",
        primary400: "#2eb1ff",
        primary500: "#10a1fc",
        primary600: "#0077d1",
        primary700: "#005ea9",
        primary800: "#01518b",
        primary900: "#074373",
        primary950: "#052b4c",
      }
    },
  },
  plugins: [],
}