/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'sga-red': '#D41B2C',
        'sga-red-hover': '#b51727',
        'sga-red-active': '#87121d',
        'transparent-gray': '#ECECEC52',
        'alert-yellow': '#FFEDC0'
      },
      fontFamily: {
        'montserrat': ['Montserrat'],
        'sans': ['"Open Sans"'],
      },
    },
  },
  plugins: [],
}
