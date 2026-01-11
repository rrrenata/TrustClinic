/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    "../shared-components/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff4ec9',
        secondary: '#00c1ff',
        accent: '#a0e6ff'
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace']
      }
    }
  },
  plugins: []
}
