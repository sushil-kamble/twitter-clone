const colors = require("@tailwindcss/postcss7-compat/colors");

module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],

  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        heading: ["Roboto", "sans-serif"],
        text: ["Ubuntu", "sans-serif"]
      },
      colors: {
        primary: colors.sky["500"],
        secondary: colors.gray["700"],
        error: colors.red["500"]
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
