/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans:  ['Plus Jakarta Sans', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
        mono:  ['JetBrains Mono', 'monospace'],
      },
      colors: {
        teal: {
          50:  '#E1F5EE',
          100: '#9FE1CB',
          200: '#5DCAA5',
          300: '#1D9E75',
          400: '#0F6E56',
          500: '#085041',
          600: '#04342C',
        },
        ink: {
          50:  '#F5F7F6',
          100: '#E8EDEA',
          200: '#C8D4CE',
          300: '#8FA89E',
          400: '#5A7A6E',
          500: '#2E4F44',
          600: '#1A302A',
          700: '#0D1A16',
        },
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up':      'fadeUp 0.5s ease forwards',
        'fade-up-slow': 'fadeUp 0.6s ease 0.15s forwards',
        'fade-up-lazy': 'fadeUp 0.7s ease 0.3s forwards',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}