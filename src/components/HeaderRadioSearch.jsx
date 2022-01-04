import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { fetchMeals, fetchDrinks } from '../helpers/fetchsFromAPI';

function HeaderRadioSearch({ searchInputValue }) {
  const [radioValue, setRadioValue] = useState('');
  const { setMeals, setDrinks, setFirstTime } = useContext(AppContext);

  const { pathname: location } = useLocation();

  const urlChanger = location === '/comidas' ? 'themealdb' : 'thecocktaildb';

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  const fetchFromAPI = async (URL) => {
    if (location === '/comidas') {
      const meals = await fetchMeals(URL, searchInputValue);
      setMeals(meals);
      setFirstTime(false);
    }

    if (location === '/bebidas') {
      const drinks = await fetchDrinks(URL, searchInputValue);
      setDrinks(drinks);
      setFirstTime(false);
    }
  };

  const handleExecSearchButton = () => {
    switch (radioValue) {
    case 'ingredient':
      fetchFromAPI(`https://www.${urlChanger}.com/api/json/v1/1/filter.php?i=`);
      break;
    case 'name':
      fetchFromAPI(`https://www.${urlChanger}.com/api/json/v1/1/search.php?s=`);
      break;

    case 'first-letter':
      if (searchInputValue.length === 1) {
        fetchFromAPI(`https://www.${urlChanger}.com/api/json/v1/1/search.php?f=`);
      } else {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
      }
      break;
    default:
      break;
    }
  };

  return (
    <section>
      <label htmlFor="ingredient">
        Ingrediente
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          id="ingredient"
          name="search-radio"
          value="ingredient"
          onChange={ handleRadioChange }
        />
      </label>
      <label htmlFor="name">
        Nome
        <input
          data-testid="name-search-radio"
          type="radio"
          id="name"
          name="search-radio"
          value="name"
          onChange={ handleRadioChange }

        />
      </label>
      <label htmlFor="first-letter">
        Primeira letra
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          id="first-letter"
          name="search-radio"
          value="first-letter"
          onChange={ handleRadioChange }

        />
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleExecSearchButton }
      >
        Filtrar
      </button>
    </section>
  );
}

HeaderRadioSearch.propTypes = {
  searchInputValue: PropTypes.string.isRequired,
};

export default HeaderRadioSearch;
