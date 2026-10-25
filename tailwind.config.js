/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blush: '#F8C8DC',
        rose: '#F4A6C1',
        romance: '#C9184A',
        cherry: '#9D174D',
        cream: '#FFF9F5',
        champagne: '#E8CFA8',
        lavender: '#E6D9F2',
        burgundy: '#3B1026',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
        script: ['Caveat', 'cursive'],
      },
    },
  },
  plugins: [],
};
