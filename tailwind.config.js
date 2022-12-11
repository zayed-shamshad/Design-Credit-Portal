/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
    './src/**/*.js',
    './src/**/*.ts',
    './src/**/*.tsx',

  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1E90FF',
        'secondary': '#FF6347',
        'danger': '#DC143C',
      },

      fontFamily: {
        'sans': ['Nunito', 'sans-serif'],
      },
      



    },
  },
  plugins: [],
}
