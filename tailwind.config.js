
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',  // Para garantir que o Tailwind use as pastas do Next.js (app, pages, etc.)
    './components/**/*.{js,ts,jsx,tsx}',  // Onde os seus componentes UI estão
    './src/**/*.{js,ts,jsx,tsx}',  // Para importar qualquer arquivo de src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
