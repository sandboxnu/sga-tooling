/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "btn-disabled": "#696969",
        "sga-red": "#D41B2C",
        "sga-red-hover": "#b51727",
        "sga-red-active": "#87121d",
        "transparent-gray": "#ECECEC52",
        "alert-yellow": "#FFEDC0",
        "tag-blue": "#8DD8E6",
        "tag-green": "#88BB77",
        "attendance-text-green": "#008000",
        "attendance-green": "#77DD77",
        "attendance-yellow": "#FEC12F",
        "attendance-red": "#D41B2C",
        "attendance-grey": "#767676",
      },
      backgroundImage: {
        "cooper-mobile": "url(../src/assets/cooper-mobile.jpg)",
        "cooper-mobile-festive": "url(../src/assets/cooper-mobile-festive.png)",
        "cooper-big-boy": "url(../src/assets/cooper-big-boy.jpg)",
        isec: "url('../src/assets/Isec.png')",
      },
      fontFamily: {
        montserrat: ["Montserrat"],
        sans: ['"Open Sans"'],
      },
      dropShadow: {
        "event-dropdown": "0 12px 12px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
