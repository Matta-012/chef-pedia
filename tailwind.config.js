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
        'wave-pattern': "url('images/waveBg.svg')",
      },
      screens: {
        'phone-p': '320px',
        'phone-m': '375px',
        'phone-g': '425px',
        'tab-p': '640px',
        'tab': '768px',
        'laptop': '1024px',
        'laptop-g': '1440px',
      },
      maxWidth: {
        'max-p': '320px',
        'max-m': '375px',
        'max-g': '425px',
      },
    },
  },
  plugins: [],
};
