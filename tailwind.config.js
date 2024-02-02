/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: "class",
  theme: {
    extend: {
      grayscale: {
        '50': '50%', // Custom grayscale value
      },
      height: {
        '2screen': '200vh', // 2 times the screen height
        '3screen': '300vh', // 3 times the screen height
      },
      backgroundImage: {
        'bkg': "url('./public/assets/darkAcademiaLibrary.jpeg')",
      },
      borderRadius: {
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
};
