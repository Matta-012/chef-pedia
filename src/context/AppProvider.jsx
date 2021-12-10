import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [meals, setMeals] = useState([{}]);
  const [drinks, setDrinks] = useState([{}]);

  return (
    <AppContext.Provider value={ { meals, setMeals, drinks, setDrinks } }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
