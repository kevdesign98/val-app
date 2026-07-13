/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      keyframes: {
        'loading-bar': {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(200%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
      animation: {
        'loading-bar': 'loading-bar 2s infinite ease-in-out',
      }
    },
  },
  plugins: [require('tailwindcss-primeui')]
};