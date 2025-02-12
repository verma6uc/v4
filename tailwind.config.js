/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'enter-from-right': {
          '0%': { transform: 'translateX(200px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'enter-from-left': {
          '0%': { transform: 'translateX(-200px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'exit-to-right': {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(200px)', opacity: '0' },
        },
        'exit-to-left': {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-200px)', opacity: '0' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'enter-from-top': {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'enter-from-bottom': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'ripple': {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        'draw-line': {
          '0%': { 'stroke-dashoffset': '1000' },
          '100%': { 'stroke-dashoffset': '0' },
        },
      },
      animation: {
        'enter-from-right': 'enter-from-right 0.25s ease-out',
        'enter-from-left': 'enter-from-left 0.25s ease-out',
        'exit-to-right': 'exit-to-right 0.25s ease-in',
        'exit-to-left': 'exit-to-left 0.25s ease-in',
        'scale-in': 'scale-in 0.2s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'enter-from-top': 'enter-from-top 0.25s ease-out',
        'enter-from-bottom': 'enter-from-bottom 0.25s ease-out',
        'ripple': 'ripple 1s cubic-bezier(0.4, 0, 0.2, 1)',
        'draw-line': 'draw-line 2s ease-out forwards',
      },
    },
  },
  plugins: [],
}