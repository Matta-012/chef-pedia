const LIST_LIMIT = 12;

const fetchMeals = async (URL, searchInputValue) => {
  const response = await fetch(`${URL}${searchInputValue}`);
  const { meals } = await response.json();
  if (meals) {
    return meals;
  }
  return [];
};

const fetchDrinks = async (URL, searchInputValue) => {
  const response = await fetch(`${URL}${searchInputValue}`);
  const { drinks } = await response.json();
  if (drinks) {
    const limit = drinks.slice(0, LIST_LIMIT);
    return limit;
  }
  return [];
};

const fetchMealById = async (id) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const { meals } = await response.json();
  return meals[0];
};

const fetchDrinkById = async (id) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const { drinks } = await response.json();
  return drinks[0];
};

export { fetchMeals, fetchDrinks, fetchMealById, fetchDrinkById };
