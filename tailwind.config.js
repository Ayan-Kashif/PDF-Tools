/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#42f8f5',
        dark: {
          800: '#0f172a',
          700: '#1e293b',
          600: '#334155',
        },
        gray: {
          400: '#94a3b8',
        }
      }
    },
  },
  plugins: [],
}