/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",          // main HTML file
    "./src/**/*.{js,ts,jsx,tsx}" // all React components
  ],
  theme: {
    extend: {
      colors: {
        accent: "#FF7F50",        // your accent color (can be used in highlights)
        accentHover: "#FF9A76",   // hover color for buttons
        background: "#0d0d0d",    // dark background default for galaxy
        secondaryText: "#d1d5db", // light gray text
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
