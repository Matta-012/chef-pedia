import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import {
  fetchByIngredients as fetchAreaOptions,
  fetchByIngredients as fetchMeals,
} from '../helpers/fetchesFromAPI';

const MEALS_AREA_LIST_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const MEALS_AREA_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';
const ALL_MEALS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export default function ExploreLocal() {
  const [mealsArea, setMealsArea] = useState([]);
  const [areaFilter, setAreaFilter] = useState('All');
  const { meals, setMeals, sliceAPIResponse } = useContext(AppContext);

  useEffect(() => {
    const fetchAreaList = async () => {
      const request = await fetchAreaOptions(MEALS_AREA_LIST_URL);
      setMealsArea(request.meals);
    };
    fetchAreaList();
  }, []);

  useEffect(() => {
    const fetchMealsByArea = async () => {
      const areaURLFilter = areaFilter === 'All'
        ? ALL_MEALS_URL
        : `${MEALS_AREA_URL}${areaFilter}`;

      const response = await fetchMeals(areaURLFilter);
      const mealsByArea = sliceAPIResponse(response.meals);
      setMeals(mealsByArea);
    };
    fetchMealsByArea();
  }, [areaFilter]);

  const handleDropdownChange = ({ target }) => {
    setAreaFilter(target.value);
  };

  return (
    <div className="h-screen">
      <Header />
      <h1
        data-testid="page-title"
        className="text-login-bg text-center text-xl font-semibold mt-4"
      >
        Explorar Origem
      </h1>
      <section className="flex justify-center">
        <select
          name="area-dropdown"
          id="area-dropdown"
          data-testid="explore-by-area-dropdown"
          onChange={ (e) => handleDropdownChange(e) }
          className="text-login-bg text-center text-xl my-4 bg-white w-80 sm:mx-3 sm:w-full h-9 border-2 rounded focus:outline-none focus:ring focus:ring-light-login-bg"
        >
          <option data-testid="All-option" value="All">All</option>
          {mealsArea.map(({ strArea }, index) => (
            <option
              key={ `${strArea} - ${index}` }
              data-testid={ `${strArea}-option` }
              value={ strArea }
            >
              {strArea}
            </option>
          ))}
        </select>
      </section>

      <section className="grid grid-cols-2 gap-5 px-4 mb-6 sm:grid-cols-3 lg:grid-cols-4">
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
      </section>
      <Footer />
    </div>
  );
}
