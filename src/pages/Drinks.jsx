import React, { useContext, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import FilterCategory from '../components/FilterCategory';
import { filterDrinksByCategory, getSimpleListDrinks } from '../helpers/fetchesFromAPI';
import '../styles/recipe-card.css';

function Drinks() {
  const { drinks,
    setDrinks,
    firstTime,
    categoriesDrinks,
    currentFilter,
    setCurrentFilter,
    drinksByCategories,
    setDrinksByCategories,
  } = useContext(AppContext);
  const alertMessage = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
  const [isCategoryClicked, setIsCategoryClicked] = useState(false);

  const filterCategory = (category) => {
    if (!isCategoryClicked) {
      setCurrentFilter('category');
      filterDrinksByCategory(URL, category, setDrinks);
      setDrinksByCategories({
        ...drinksByCategories,
        name: category,
        drinksInList: drinks,
      });
      setIsCategoryClicked(true);
    } else if (isCategoryClicked && drinksByCategories.name !== category) {
      setCurrentFilter('category');
      filterDrinksByCategory(URL, category, setDrinks);
      setDrinksByCategories({
        ...drinksByCategories,
        name: category,
      });
    } else {
      setDrinksByCategories({
        ...drinksByCategories,
        name: '',
      });
      setDrinks(drinksByCategories.drinksInList);
      setIsCategoryClicked(false);
    }
  };

  return (
    <div>
      <Header />
      <h1
        data-testid="page-title"
        className="text-login-bg text-center text-xl font-semibold mt-4"
      >
        Bebidas
      </h1>
      <div className="grid grid-cols-2 py-6 gap-y-2 sm:grid-cols-3">
        <div className="mx-auto">
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ () => getSimpleListDrinks(setDrinks) }
            className="border border-login-bg text-login-bg w-40 rounded-xl hover:bg-login-bg hover:text-white transition duration-200 drink-category-btn"
          >
            All
          </button>
        </div>
        {categoriesDrinks.map((category) => (
          <FilterCategory
            key={ category.strCategory }
            categoryName={ category.strCategory }
            filterCategory={ filterCategory }
            classes="border border-login-bg text-login-bg w-40 rounded-xl drink-category-btn hover:bg-login-bg hover:text-white transition duration-200"
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-5 px-4 mb-6 sm:grid-cols-3 lg:grid-cols-4">
        {drinks.map((drink, index) => (
          <Link key={ drink.idDrink } to={ `/bebidas/${drink.idDrink}` }>
            <RecipeCard
              id={ drink.idDrink }
              image={ drink.strDrinkThumb }
              title={ drink.strDrink }
              index={ index }
              cardType="recipe"
            />
          </Link>
        ))}
      </div>
      {drinks.length === 0 && !firstTime && global.alert(alertMessage)}
      {currentFilter === 'radio'
      && drinks.length === 1
      && <Redirect to={ `/bebidas/${drinks[0].idDrink}` } />}
      <Footer />
    </div>
  );
}

export default Drinks;
