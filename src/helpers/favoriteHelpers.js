import { getLocalStorage } from './manageLocalStorage';

export const createFavoriteObj = (foodObj, foodType) => {
  if (foodType === 'meal') {
    return {
      id: foodObj.idMeal,
      type: 'comida',
      area: foodObj.strArea,
      category: foodObj.strCategory,
      alcoholicOrNot: '',
      name: foodObj.strMeal,
      image: foodObj.strMealThumb,
    };
  }

  return {
    id: foodObj.idDrink,
    type: 'bebida',
    area: '',
    category: foodObj.strCategory,
    alcoholicOrNot: foodObj.strAlcoholic,
    name: foodObj.strDrink,
    image: foodObj.strDrinkThumb,
  };
};

export const isRecipeFavorite = (id) => {
  const favorites = getLocalStorage('favoriteRecipes');
  let isFavorite = false;
  if (favorites) {
    isFavorite = favorites.find((favorite) => favorite.id === id);
  }
  return isFavorite;
};
