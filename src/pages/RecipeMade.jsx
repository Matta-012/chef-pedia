import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import GoBackTop from '../components/GoBackTop.jsx';
import DoneRecipeCard from '../components/DoneRecipeCard';
import NoneRecipesMade from '../components/NoneRecipesMade';
import { getLocalStorage } from '../helpers/manageLocalStorage';
import '../styles/default-font.css';

export default function RecipeMade() {
  const doneRecipes = getLocalStorage('doneRecipes');
  const [recipeByType, setRecipeByType] = useState([]);

  useEffect(() => {
    setRecipeByType(doneRecipes);
  }, []);

  const filterByType = (type) => {
    const filteredRecipe = doneRecipes.filter((recipe) => recipe.type === type);
    setRecipeByType(filteredRecipe);
  };

  if (!recipeByType) {
    return <NoneRecipesMade />;
  }

  return (
    <div className="font-wrapper">
      <section className="flex justify-between">
        <GoBackTop
          pageName="Receitas Feitas"
          btnClasses="p-4"
          dataTest="page-title"
        />
        <div className="mr-5 md:mr-0">
          <Header />
        </div>
      </section>

      <div className="grid grid-cols-2 py-6 gap-y-2 sm:grid-cols-3 mx-4 md:mx-auto md:w-3/4 lg:w-3/5">
        <div className="mx-auto">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => setRecipeByType(doneRecipes) }
            className="border border-login-bg text-login-bg w-40 rounded-xl hover:bg-login-bg hover:text-white transition duration-200 drink-category-btn"
          >
            All
          </button>
        </div>

        <div className="mx-auto">
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ () => filterByType('comida') }
            className="border border-login-bg text-login-bg w-40 rounded-xl hover:bg-login-bg hover:text-white transition duration-200 drink-category-btn"
          >
            Food
          </button>
        </div>

        <div className="mx-auto">
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => filterByType('bebida') }
            className="border border-login-bg text-login-bg w-40 rounded-xl hover:bg-login-bg hover:text-white transition duration-200 drink-category-btn"
          >
            Drinks
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 px-4 mb-6 sm:grid-cols-3 lg:grid-cols-4">
        {recipeByType
          ? (
            recipeByType.map((doneRecipe, index) => (
              <DoneRecipeCard
                key={ doneRecipe.id }
                id={ doneRecipe.id }
                tags={ doneRecipe.tags }
                index={ index }
                category={ doneRecipe.category }
                name={ doneRecipe.name }
                doneDate={ doneRecipe.doneDate }
                image={ doneRecipe.image }
                type={ doneRecipe.type }
                area={ doneRecipe.area }
                alcoholicOrNot={ doneRecipe.alcoholicOrNot }
              />
            ))) : <NoneRecipesMade />}
      </div>
    </div>
  );
}
