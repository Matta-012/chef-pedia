import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import FilterCategory from '../components/FilterCategory';
import { filterMealsByCategory, getSimpleListMeals } from '../helpers/fetchesFromAPI';

function Meals() {
  const { meals,
    setMeals,
    firstTime,
    categoriesMeals,
    mealsByCategories,
    setMealsByCategories,
    currentFilter,
    setCurrentFilter } = useContext(AppContext);
  const alertMessage = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
  const URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
  const [isCategoryClicked, setIsCategoryClicked] = useState(false);

  const filterCategory = (category) => {
    if (!isCategoryClicked) {
      setCurrentFilter('category');
      filterMealsByCategory(URL, category, setMeals);
      setMealsByCategories({
        ...mealsByCategories,
        name: category,
        mealsInList: meals,
      });
      setIsCategoryClicked(true);
    } else if (isCategoryClicked && mealsByCategories.name !== category) {
      setCurrentFilter('category');
      filterMealsByCategory(URL, category, setMeals);
      setMealsByCategories({
        ...mealsByCategories,
        name: category,
      });
    } else {
      console.log('else');
      setMealsByCategories({
        ...mealsByCategories,
        name: '',
      });
      setMeals(mealsByCategories.mealsInList);
      setIsCategoryClicked(false);
    }
  };

  return (
    <div>
      <Header />
      <h1 data-testid="page-title">Comidas</h1>
      <div>
        {categoriesMeals.map((category) => (
          <FilterCategory
            key={ category.strCategory }
            categoryName={ category.strCategory }
            filterCategory={ filterCategory }
          />
        ))}
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => getSimpleListMeals(setMeals) }
        >
          All
        </button>
      </div>
      {meals.map((meal, index) => (
        <RecipeCard
          key={ meal.idMeal }
          id={ meal.idMeal }
          recipe="comidas"
          image={ meal.strMealThumb }
          title={ meal.strMeal }
          index={ index }
        />
      ))}
      {meals.length === 0 && !firstTime && global.alert(alertMessage)}
      {currentFilter === 'radio'
      && meals.length === 1
      && <Redirect to={ `/comidas/${meals[0].idMeal}` } />}
      <Footer />
    </div>
  );
}

export default Meals;
