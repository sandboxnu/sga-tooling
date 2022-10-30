/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'sgared': '#D41B2C',
        'sgared-hover': '#b51727',
        'sgared-active': '#87121d',
        'transparent-gray': '#ECECEC52',
        'alert-yellow': '#FFEDC0'
      },
    }
  },
  plugins: [],
}
