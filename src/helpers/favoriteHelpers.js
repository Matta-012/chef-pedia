const createFavoriteObj = (foodObj, foodType) => {
  if (foodType === 'meal') {
    return {
      id: foodObj.idMeal,
      type: 'comida',
      area: foodObj.strArea,
      category: foodObj.strCategory,
      alcoholic: '',
      name: foodObj.strMeal,
      image: foodObj.strMealThumb,
    };
  }

  return {
    id: foodObj.idDrink,
    type: 'bebida',
    area: '',
    category: foodObj.strCategory,
    alcoholic: foodObj.strAlcoholic,
    name: foodObj.strDrink,
    image: foodObj.strDrinkThumb,
  };
};

// "id": "52771",
// "type": "comida",
// "area": "Italian",
// "category": "Vegetarian",
// "alcoholicOrNot": "",
// "name": "Spicy Arrabiata Penne",
// "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",

export default createFavoriteObj;
