import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import DoneRecipeCard from '../components/DoneRecipeCard';
import { getLocalStorage } from '../helpers/manageLocalStorage';

export default function RecipeMade() {
  const doneRecipes = getLocalStorage('doneRecipes');
  const [recipeByType, setRecipeByType] = useState([]);

  useEffect(() => {
    setRecipeByType(doneRecipes);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterByType = (type) => {
    const filteredRecipe = doneRecipes.filter((recipe) => recipe.type === type);
    setRecipeByType(filteredRecipe);
  };

  return (
    <div>
      <Header />
      <h1 data-testid="page-title">Receitas Feitas</h1>
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setRecipeByType(doneRecipes) }
        >
          All
        </button>

        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => filterByType('comida') }
        >
          Food
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterByType('bebida') }
        >
          Drinks
        </button>

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
            ))
          ) : []}
      </div>
    </div>
  );
}
