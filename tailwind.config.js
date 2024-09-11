/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryDanger: '#73262C',
        secondDanger: '#A6495B',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
