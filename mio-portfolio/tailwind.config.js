/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // IMPORTANTE!
  ],
  theme: {
    extend: {
      // Qui puoi aggiungere i font e i colori delle design_notes.md
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        // Esempio dalla Palette 1
        'brand-dark': '#111111',
        'brand-light': '#F4F4F4',
        'brand-accent': '#00A3FF',
      }
    },
  },
  plugins: [],
}
