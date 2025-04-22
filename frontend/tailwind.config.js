/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#d9e4ff',
          200: '#bacfff',
          300: '#8eaeff',
          400: '#5b83ff',
          500: '#3b5bff',
          600: '#2639f5',
          700: '#1e2ce0',
          800: '#1e27b9',
          900: '#1f2891',
          950: '#111342',
        },
        secondary: {
          50: '#f3f1ff',
          100: '#ebe5ff',
          200: '#d9ceff',
          300: '#bea6ff',
          400: '#9f75ff',
          500: '#8242ff',
          600: '#7122ff',
          700: '#6010f1',
          800: '#510ed8',
          900: '#4311af',
          950: '#27076e',
        },
        accent: {
          50: '#fff6ed',
          100: '#ffebd5',
          200: '#ffd4aa',
          300: '#ffb775',
          400: '#ff903c',
          500: '#ff7113',
          600: '#ff5a04',
          700: '#c93e00',
          800: '#9f3305',
          900: '#812e0a',
          950: '#461404',
        },
      },
      animation: {
        'twinkle': 'twinkle 5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};