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
        '85': '340px', // Tamaño personalizado
      },
      colors: {
        'sidebar-active': '#181e27',
        // Agrega más colores si es necesario
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'), // Asegúrate de incluir el plugin
  ],
}
