const { url } = require('inspector');

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
      fontFamily: {
        montserrat: ["Montserrat"],
        sans: ['"Open Sans"'],
      },
      dropShadow: {
        'event-dropdown': '0 12px 12px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};
