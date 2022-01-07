import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import {
  getSimpleListMeals,
  getSimpleListDrinks,
  getCategoryMeals,
  getCategoryDrinks,
  fetchByIngredients,
  LIST_LIMIT,
} from '../helpers/fetchesFromAPI';

const MEALS_INGREDIENTS_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const DRINKS_INGREDIENTS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
const MEALS_BY_INGREDIENTS_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const DRINKS_BY_INGREDIENTS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

export default function AppProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [mealsByCategories, setMealsByCategories] = useState({});
  const [drinksByCategories, setDrinksByCategories] = useState({});
  const [currentFilter, setCurrentFilter] = useState('');
  const [firstTime, setFirstTime] = useState(true);
  const [categoriesMeals, setCategoriesMeals] = useState([]);
  const [categoriesDrinks, setCategoriesDrinks] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const history = useHistory();

  const urlCategoryMeals = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const urlCategoryDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  useEffect(() => {
    getSimpleListMeals(setMeals);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getSimpleListDrinks(setDrinks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getCategoryMeals(setCategoriesMeals, urlCategoryMeals);
  }, []);

  useEffect(() => {
    getCategoryDrinks(setCategoriesDrinks, urlCategoryDrinks);
  }, []);

  const handleRoute = (route) => {
    history.push(`${route}`);
  };

  const getIngredientsList = async (currentLocationPath) => {
    if (currentLocationPath === 'bebidas') {
      const result = await fetchByIngredients(DRINKS_INGREDIENTS_URL);
      const drinksIngredients = result.drinks
        .map(({ strIngredient1 }) => strIngredient1)
        .slice(0, LIST_LIMIT);

      const ingredientList = drinksIngredients.map((ingredient) => ({
        ingredient,
        ingredientImg: `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`,
      }));
      setIngredientsList(ingredientList);
    } else {
      const result = await fetchByIngredients(MEALS_INGREDIENTS_URL);
      const mealsIngredients = result.meals
        .map(({ strIngredient }) => strIngredient)
        .slice(0, LIST_LIMIT);

      const ingredientList = mealsIngredients.map((ingredient) => ({
        ingredient,
        ingredientImg: `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`,
      }));
      setIngredientsList(ingredientList);
    }
  };

  const sliceAPIResponse = (response) => (
    response.length > LIST_LIMIT ? response.slice(0, LIST_LIMIT) : response
  );

  const handleIngredientClick = async (currentLocationPath, ingredient) => {
    if (currentLocationPath === 'bebidas') {
      const results = await fetchByIngredients(
        `${DRINKS_BY_INGREDIENTS_URL}${ingredient}`,
      );
      const slicedResponse = sliceAPIResponse(results.drinks);
      setDrinks(slicedResponse);
      handleRoute('/bebidas');
    } else {
      const results = await fetchByIngredients(
        `${MEALS_BY_INGREDIENTS_URL}${ingredient}`,
      );
      const slicedResponse = sliceAPIResponse(results.meals);
      setMeals(slicedResponse);
      handleRoute('/comidas');
    }
  };

  return (
    <AppContext.Provider
      value={ {
        meals,
        setMeals,
        drinks,
        setDrinks,
        mealsByCategories,
        setMealsByCategories,
        drinksByCategories,
        setDrinksByCategories,
        currentFilter,
        setCurrentFilter,
        firstTime,
        setFirstTime,
        categoriesMeals,
        categoriesDrinks,
        handleRoute,
        ingredientsList,
        getIngredientsList,
        handleIngredientClick,
      } }
    >
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
