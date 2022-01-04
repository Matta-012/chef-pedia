import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [meals, setMeals] = useState([{}]);
  const [drinks, setDrinks] = useState([{}]);

  const fetchFromAPI = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const results = await response.json();
    setMeals(results);
  };

  useEffect(() => {
    fetchFromAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppContext.Provider value={ { meals, setMeals, drinks, setDrinks } }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
