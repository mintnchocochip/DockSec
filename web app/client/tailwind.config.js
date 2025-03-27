/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        particle: {
          '0%': { 
            transform: 'translate(-50%, -50%) scale(1)',
            opacity: '0.5'
          },
          '100%': { 
            transform: 'translate(calc(var(--x) * 100%), calc(var(--y) * 100%)) scale(0)',
            opacity: '0'
          }
        }
      },
      animation: {
        particle: 'particle 5s linear infinite'
      }
    },
  },
  plugins: [],
}