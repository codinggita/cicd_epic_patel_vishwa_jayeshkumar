/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#6D28D9',      // Royal Violet
          secondary: '#14B8A6',    // Teal
          accent: '#F97316',       // Burnt Orange
          background: '#FFFDF8',   // Warm Ivory
          text: '#334155',         // Slate
        },
        primary: '#6D28D9',
        secondary: '#14B8A6',
        accent: '#F97316',
        warm: {
          50: '#FFFEFC',
          100: '#FFFDF8',
          200: '#FFF9ED',
          300: '#FFF0D4',
        },
        dark: {
          bg: '#0A0915',
          card: '#121124',
          border: 'rgba(20, 184, 166, 0.1)',
          text: '#F1F5F9',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'glass-light': '0 8px 32px 0 rgba(109, 40, 217, 0.04)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'premium': '0 10px 40px -10px rgba(109, 40, 217, 0.08)',
        'premium-hover': '0 20px 50px -10px rgba(109, 40, 217, 0.15)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      }
    },
  },
  plugins: [],
}
