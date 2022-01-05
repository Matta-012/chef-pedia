import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import FilterCategory from '../components/FilterCategory';
import { filterDrinksByCategory } from '../helpers/fetchesFromAPI';

function Drinks() {
  const { drinks,
    setDrinks,
    firstTime,
    categoriesDrinks,
    currentFilter,
    setCurrentFilter } = useContext(AppContext);
  const alertMessage = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

  const filterCategory = (category) => {
    setCurrentFilter('category');
    filterDrinksByCategory(URL, category, setDrinks);
  };

  return (
    <div>
      <Header />
      <h1 data-testid="page-title">Bebidas</h1>
      <div>
        {categoriesDrinks.map((category) => (
          <FilterCategory
            key={ category.strCategory }
            categoryName={ category.strCategory }
            filterCategory={ filterCategory }
          />
        ))}
      </div>
      {drinks.map((drink, index) => (
        <RecipeCard
          key={ drink.idDrink }
          image={ drink.strDrinkThumb }
          title={ drink.strDrink }
          index={ index }
        />
      ))}
      {drinks.length === 0 && !firstTime && global.alert(alertMessage)}
      {currentFilter === 'radio'
      && drinks.length === 1
      && <Redirect to={ `/bebidas/${drinks[0].idDrink}` } />}
      <Footer />
    </div>
  );
}

export default Drinks;
