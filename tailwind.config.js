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
        'home-screen': '88vh',
        'screen': '94vh',
        '2screen': '188vh', // 2 times the screen height
        '3screen': '282vh', // 3 times the screen height
      },
      backgroundImage: {
        'bkg': "url('/public/assets/darkAcademiaLibrary.jpeg')",
      },
      borderRadius: {
        '5xl': '2.5rem',
      },
      scrollbar: {
        width: '12px',
        track: 'transparent',
        thumb: 'rgba(156, 163, 175, var(--scrollbar-thumb-opacity))',
        thumbHover: 'rgba(138, 145, 156, var(--scrollbar-thumb-opacity))',
      },
    },
  },
  plugins: [],
};
