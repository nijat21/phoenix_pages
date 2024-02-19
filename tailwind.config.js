/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      grayscale: {
        50: '50%', // Custom grayscale value
      },
      height: {
        'home-screen': '88vh',
        screen: '94vh',
        '2screen': '188vh', // 2 times the screen height
        '3screen': '282vh', // 3 times the screen height

        'home-screen-mobile': '95vh',
        'screen-mobile': '94vh',
        '2screen-mobile': '188vh', // 2 times the screen height
        '3screen-mobile': '282vh', // 3 times the screen height
      },
      backgroundImage: {
        bkg: "url('/public/assets/darkAcademiaLibrary.jpeg')",
      },
      borderRadius: {
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
