/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Add any additional folders where you'll use Tailwind
  ],
  theme: {
    extend: {
      fontFamily: {
        headings: ['"Playfair Display"', 'serif'],
        body: ['"Montserrat"', 'sans-serif'],
      },
      colors: {
        black: '#0e161c',
        accent: '#89b1dd',
        'gray-light': '#f0f1ee',
        'gray-dark': '#202124',
        highlight: '#e9f733',
      },
      backgroundImage: {
        'join-page': "url('/images/bg-join.png')",
      },
    },
  },
  plugins: [],
};