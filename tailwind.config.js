/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/views/**/*.erb',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/javascript/**/*.ts',
    './app/javascript/**/*.tsx',
    './lib/tasks/**/*.rake',
    './config/initializers/**/*.rb'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
