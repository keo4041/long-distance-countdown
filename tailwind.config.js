/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        script: ['"Dancing Script"', 'cursive'],
      },
      colors: {
        'rose-gold': '#B76E79',
        'twilight': '#1E293B', // A deep blue-gray
      }
    },
  },
  plugins: [],
};