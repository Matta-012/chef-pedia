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

export { fetchMeals, fetchDrinks };
