import React, { useContext, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import FilterCategory from '../components/FilterCategory';
import { filterMealsByCategory, getSimpleListMeals } from '../helpers/fetchesFromAPI';
import '../styles/recipe-card.css';

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
      <h1
        data-testid="page-title"
        className="text-login-bg text-center text-xl font-semibold mt-4"
      >
        Comidas
      </h1>
      <div>
        <div className="grid grid-cols-3 py-6 gap-y-2 md:w-3/5 lg:w-2/5 md:mx-auto mx-4">
          <div className="mx-auto">
            <button
              type="button"
              data-testid="All-category-filter"
              onClick={ () => getSimpleListMeals(setMeals) }
              className="border border-login-bg text-login-bg w-24 rounded-xl meal-category-btn hover:bg-login-bg hover:text-white transition duration-200"
            >
              All
            </button>
          </div>
          {categoriesMeals.map((category) => (
            <FilterCategory
              key={ category.strCategory }
              categoryName={ category.strCategory }
              filterCategory={ filterCategory }
              classes="border border-login-bg text-login-bg w-24 rounded-xl meal-category-btn hover:bg-login-bg hover:text-white transition duration-200"
            />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-5 px-4 mb-6 sm:grid-cols-3 lg:grid-cols-4">
          {meals.map((meal, index) => (
            <Link key={ meal.idMeal } to={ `/comidas/${meal.idMeal}` }>
              <RecipeCard
                id={ meal.idMeal }
                image={ meal.strMealThumb }
                title={ meal.strMeal }
                index={ index }
                cardType="recipe"
              />
            </Link>
          ))}
        </div>
        {meals.length === 0 && !firstTime && global.alert(alertMessage)}
        {currentFilter === 'radio'
        && meals.length === 1
        && <Redirect to={ `/comidas/${meals[0].idMeal}` } />}

        {/* <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div class="md:flex">
            <div class="md:shrink-0">
              <img class="h-48 w-full object-cover md:h-full md:w-48" src="sorvetin.png" alt="Man looking at item at a store"/>
            </div>
            <div class="p-8">
              <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Case study</div>
              <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Finding customers for your new business</a>
              <p class="mt-2 text-gray-500">Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.</p>
            </div>
          </div>
        </div> */}
      </div>
      <Footer />
    </div>
  );
}

export default Meals;
