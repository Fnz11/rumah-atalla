/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        helvetica: ["helvetica", "sans-serif"],
        ubuntu: ["Ubuntu", "sans-serif"],
      },
      colors: {
        primaryDark: "#3A4D39",
        primaryNormal: "#4F6F52",
        primaryThin: "#739072",
        primaryVeryThin: "#739072",
        secondaryDark: "#b57331",
        secondary: "#7E6363",
        thirdyNormal: "#F0E9DE",
        thirdyThin: "#F6FAF2",
      },
    },
  },
  plugins: [],
};
