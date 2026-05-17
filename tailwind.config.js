/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:   { DEFAULT:'#1a3a6e', light:'#2557a7', pale:'#e8f0fe' },
        secondary: { DEFAULT:'#1a7a4a', light:'#27ae60', pale:'#e8f5e9' },
        accent:    { DEFAULT:'#f39c12', light:'#f5b942' },
      },
      fontFamily: { cairo: ['Cairo', 'sans-serif'] },
      animation: {
        'fade-in':   'fadeIn 0.5s ease-in-out',
        'slide-up':  'slideUp 0.5s ease-out',
        'pulse-slow':'pulse 3s infinite',
      },
      keyframes: {
        fadeIn:  { '0%':{ opacity:'0' }, '100%':{ opacity:'1' } },
        slideUp: { '0%':{ transform:'translateY(20px)', opacity:'0' }, '100%':{ transform:'translateY(0)', opacity:'1' } },
      },
    },
  },
  plugins: [],
};
