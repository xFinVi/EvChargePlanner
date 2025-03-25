/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{js,ts,jsx,tsx}',     // Scans src folder (if you use it)
      './pages/**/*.{js,ts,jsx,tsx}',   // Scans pages folder
      './components/**/*.{js,ts,jsx,tsx}', // Scans components folder (if separate)
    ],
    theme: {
      extend: {
        boxShadow: {
          'white-soft': '0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -2px rgba(255, 255, 255, 0.1)',
        },
      },
    },
    plugins: [],
  };