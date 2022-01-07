import React from 'react';
import Header from '../components/Header';
import DoneRecipeCard from '../components/DoneRecipeCard';
import { getLocalStorage } from '../helpers/manageLocalStorage';

export default function RecipeMade() {
  const doneRecipes = getLocalStorage('doneRecipes');
  console.log(doneRecipes);

  return (
    <div>
      <Header />
      <h1 data-testid="page-title">Receitas Feitas</h1>
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>

        <button
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>

        {doneRecipes
          ? (
            doneRecipes.map((doneRecipe, index) => (
              <DoneRecipeCard
                key={ doneRecipe.id }
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
