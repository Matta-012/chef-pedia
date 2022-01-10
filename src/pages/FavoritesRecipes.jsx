import React, { useEffect, useState } from 'react';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';
import Header from '../components/Header';
import { getLocalStorage, saveLocalStorage } from '../helpers/manageLocalStorage';

export default function FavoritesRecipes() {
  const favoriteRecipes = getLocalStorage('favoriteRecipes');
  const [recipeByType, setRecipeByType] = useState([]);

  useEffect(() => {
    setRecipeByType(favoriteRecipes);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterByType = (type) => {
    const filteredRecipe = favoriteRecipes.filter((recipe) => recipe.type === type);
    setRecipeByType(filteredRecipe);
  };

  const deleteFromLocalStorage = (id) => {
    const currentFavorites = getLocalStorage('favoriteRecipes');

    if (currentFavorites) {
      const newFavorites = currentFavorites.filter((favorite) => favorite.id !== id);
      saveLocalStorage('favoriteRecipes', newFavorites);
      setRecipeByType(newFavorites);
    } else {
      saveLocalStorage('favoriteRecipes', []);
      setRecipeByType([]);
    }
  };

  return (
    <div>
      <Header />
      <h1 data-testid="page-title">Receitas Favoritas</h1>
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setRecipeByType(favoriteRecipes) }
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
            recipeByType.map((favoriteRecipe, index) => (
              <FavoriteRecipeCard
                key={ favoriteRecipe.id }
                id={ favoriteRecipe.id }
                index={ index }
                category={ favoriteRecipe.category }
                name={ favoriteRecipe.name }
                image={ favoriteRecipe.image }
                type={ favoriteRecipe.type }
                area={ favoriteRecipe.area }
                alcoholicOrNot={ favoriteRecipe.alcoholicOrNot }
                deleteFromLocalStorage={ deleteFromLocalStorage }
              />
            ))
          ) : []}
      </div>
    </div>
  );
}
