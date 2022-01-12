module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'cards-icons': '#FD8061',
        'inputs': '#BFC6DC',
        'titles-text': '#1C1C1C',
        'menu-itens': '#BABABA',
        'recipe-name': '#FCFCFC',
        'country-list': '#82889E',
        'login-wave': '#F8F8F8',
        'login-bg': '#FD8061',
        'light-login-bg': '#FFE0D9',
      },
      backgroundImage: {
        'wave-pattern': "url('/home/matta/Documentos/Projetos/Chef-Pedia/src/images/waveBg.svg')",
      }
    },
  },
  plugins: [],
};
