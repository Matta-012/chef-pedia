const LIST_LIMIT = 12;
const CATEGORY_LIMIT = 5;

const fetchMeals = async (URL, searchInputValue) => {
  const response = await fetch(`${URL}${searchInputValue}`);
  const { meals } = await response.json();
  if (meals) {
    const limit = meals.slice(0, LIST_LIMIT);
    return limit;
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

const getSimpleListMeals = async (setMeals) => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const results = await response.json();
  const limit = results.meals.slice(0, LIST_LIMIT);
  setMeals(limit);
};

const getSimpleListDrinks = async (setDrinks) => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const results = await response.json();
  const limit = results.drinks.slice(0, LIST_LIMIT);
  setDrinks(limit);
};

const getCategoryMeals = async (setCategories, URL) => {
  const response = await fetch(URL);
  const results = await response.json();
  const limit = results.meals.slice(0, CATEGORY_LIMIT);
  setCategories(limit);
};

const getCategoryDrinks = async (setCategories, URL) => {
  const response = await fetch(URL);
  const results = await response.json();
  const limit = results.drinks.slice(0, CATEGORY_LIMIT);
  setCategories(limit);
};

export {
  fetchMeals,
  fetchDrinks,
  getSimpleListMeals,
  getSimpleListDrinks,
  getCategoryMeals,
  getCategoryDrinks,
};
