/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "sga-red": "#D41B2C",
        "sga-red-hover": "#b51727",
        "sga-red-active": "#87121d",
        "transparent-gray": "#ECECEC52",
        "alert-yellow": "#FFEDC0",
        "tag-blue": "#8DD8E6",
        "tag-green": "#88BB77",
      },
      backgroundImage: {
        "cooper-mobile": "url(../src/assets/login-page-cooper.jpg)",
        "cooper-mobile-festive": "url(../src/assets/login-page-cooper-festive.png)",
        "cooper-big-boy": "url(../src/assets/login-page-cooper-big.jpg)",
      },
      fontFamily: {
        montserrat: ["Montserrat"],
        sans: ['"Open Sans"'],
      },
    },
  },
  plugins: [],
};
