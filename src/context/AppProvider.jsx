import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import { getSimpleListMeals,
  getSimpleListDrinks,
  getCategoryMeals,
  getCategoryDrinks } from '../helpers/fetchesFromAPI';

export default function AppProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [mealsBycategories, setMealsBycategories] = useState([]);
  const [drinksBycategories, setDrinksBycategories] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('');
  const [firstTime, setFirstTime] = useState(true);
  const [categoriesMeals, setCategoriesMeals] = useState([]);
  const [categoriesDrinks, setCategoriesDrinks] = useState([]);

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

  return (
    <AppContext.Provider
      value={ {
        meals,
        setMeals,
        drinks,
        setDrinks,
        mealsBycategories,
        setMealsBycategories,
        drinksBycategories,
        setDrinksBycategories,
        currentFilter,
        setCurrentFilter,
        firstTime,
        setFirstTime,
        categoriesMeals,
        categoriesDrinks,
      } }
    >
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
