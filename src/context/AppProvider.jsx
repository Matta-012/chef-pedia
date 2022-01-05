import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [firstTime, setFirstTime] = useState(true);
  const LIST_LIMIT = 12;

  const fetchAPIMeals = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const results = await response.json();
    const limit = results.meals.slice(0, LIST_LIMIT);
    setMeals(limit);
  };

  useEffect(() => {
    fetchAPIMeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAPIDrinks = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const results = await response.json();
    const limit = results.drinks.slice(0, LIST_LIMIT);
    setDrinks(limit);
  };

  useEffect(() => {
    fetchAPIDrinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppContext.Provider
      value={ {
        meals, setMeals, drinks, setDrinks, firstTime, setFirstTime,
      } }
    >
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
