/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#0d1a3b',
        'primary-red': '#ef3239',
        'secondary-gray': '#f5f7fa',
        'text-dark': '#333333',
        'text-light': '#666666',
        'border-color': '#e5e7eb',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
