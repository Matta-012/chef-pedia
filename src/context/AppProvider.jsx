import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [firstTime, setFirstTime] = useState(true);

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
