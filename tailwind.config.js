/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.{html,js,css}",
    "./views/**/*.ejs",
  ],
  mode: "jit",
  theme: {
    screens: {
    sm:'480px',
    md: '786px',
    lg: '976px',
    xl: '1440px'
  },
    extend: {},
  },
  plugins: [],
}
