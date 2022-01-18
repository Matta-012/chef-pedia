import React, { useEffect, useState } from "react";
import FavoriteRecipeCard from "../components/FavoriteRecipeCard";
import GoBackTop from "../components/GoBackTop";
import Header from "../components/Header";
import NoneFavoriteRecipes from "../components/NoneFavoriteRecipes";
import {
  getLocalStorage,
  saveLocalStorage,
} from "../helpers/manageLocalStorage";

export default function FavoritesRecipes() {
  const favoriteRecipes = getLocalStorage("favoriteRecipes");
  const [recipeByType, setRecipeByType] = useState([]);

  useEffect(() => {
    setRecipeByType(favoriteRecipes);
  }, []);

  const filterByType = (type) => {
    const filteredRecipe = favoriteRecipes.filter(
      (recipe) => recipe.type === type
    );
    setRecipeByType(filteredRecipe);
  };

  const deleteFromLocalStorage = (id) => {
    const currentFavorites = getLocalStorage("favoriteRecipes");

    if (currentFavorites) {
      const newFavorites = currentFavorites.filter(
        (favorite) => favorite.id !== id
      );
      saveLocalStorage("favoriteRecipes", newFavorites);
      setRecipeByType(newFavorites);
    } else {
      saveLocalStorage("favoriteRecipes", []);
      setRecipeByType([]);
    }
  };

  if (!recipeByType || !recipeByType.length > 0) {
    return <NoneFavoriteRecipes />;
  }

  return (
    <div>
      <section className="flex justify-between">
        <GoBackTop
          pageName="Receitas Favoritas"
          btnClasses="p-4"
          dataTest="page-title"
        />
        <div className="mr-5 md:mr-0">
          <Header />
        </div>
      </section>

      <div>
        <div className="grid grid-cols-2 py-6 gap-y-2 sm:grid-cols-3 mx-4 md:mx-auto md:w-3/4 lg:w-3/5">
          <div className="mx-auto">
            <button
              type="button"
              data-testid="filter-by-all-btn"
              onClick={() => setRecipeByType(favoriteRecipes)}
              className="border border-login-bg text-login-bg w-40 rounded-xl hover:bg-login-bg hover:text-white transition duration-200 drink-category-btn"
            >
              All
            </button>
          </div>

          <div className="mx-auto">
            <button
              type="button"
              data-testid="filter-by-food-btn"
              onClick={() => filterByType("comida")}
              className="border border-login-bg text-login-bg w-40 rounded-xl hover:bg-login-bg hover:text-white transition duration-200 drink-category-btn"
            >
              Food
            </button>
          </div>

          <div className="mx-auto">
            <button
              type="button"
              data-testid="filter-by-drink-btn"
              onClick={() => filterByType("bebida")}
              className="border border-login-bg text-login-bg w-40 rounded-xl hover:bg-login-bg hover:text-white transition duration-200 drink-category-btn"
            >
              Drinks
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 px-4 mb-6 sm:grid-cols-3 lg:grid-cols-4">
        {recipeByType
          ? recipeByType.map((favoriteRecipe, index) => (
              <FavoriteRecipeCard
                key={favoriteRecipe.id}
                id={favoriteRecipe.id}
                index={index}
                category={favoriteRecipe.category}
                name={favoriteRecipe.name}
                image={favoriteRecipe.image}
                type={favoriteRecipe.type}
                area={favoriteRecipe.area}
                alcoholicOrNot={favoriteRecipe.alcoholicOrNot}
                deleteFromLocalStorage={deleteFromLocalStorage}
              />
            )) : []}
      </div>
    </div>
  );
}
