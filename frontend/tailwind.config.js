/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e40af',
          dark: '#1e3a8a',
          light: '#3b82f6',
        },
        status: {
          done: '#22c55e',
          active: '#eab308',
          over: '#ef4444',
          cancelled: '#9ca3af',
        },
        priority: {
          critical: '#ef4444',
          high: '#f97316',
          medium: '#3b82f6',
          low: '#9ca3af',
        }
      }
    },
  },
  plugins: [],
}
