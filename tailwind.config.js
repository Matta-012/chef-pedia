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
        'not-found-text': '#4A4A4A',
        'menu-itens': '#BABABA',
        'recipe-name': '#FCFCFC',
        'country-list': '#82889E',
        'login-wave': '#F8F8F8',
        'login-bg': '#FD8061',
        'light-login-bg': '#FFE0D9',
        'btn-shadow': '#AAAAAA',
      },
      backgroundImage: {
        'wave-pattern': "url('images/waveBg.svg')",
        'meals-bg': "url('images/mealsBg.svg')",
        'drinks-bg': "url('images/drinksBg.svg')",
        'drinks-ingredients-bg': "url('images/drinksIngredientBg.svg')",
        'drinks-Surprise-bg': "url('images/drinksSurpriseBg.svg')",
      },
    },
  },
  plugins: [],
};
