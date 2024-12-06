import tailwindScrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        serif: ['Lexend', 'serif'],
      },
      width: {
        '85': '340px', 
      },
      colors: {
        'sidebar-active': '#181e27',
  
      },
    },
  },
  plugins: [
    tailwindScrollbar, 
  ],
}
