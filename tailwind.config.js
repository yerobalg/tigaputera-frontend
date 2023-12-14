/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'auth': 'url("/public/components/assets/img/bg-auth.png")',
        'layout': 'url("/public/components/assets/img/bg-layout.png")',
      },
    },
  },
  plugins: [],
}