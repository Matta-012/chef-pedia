import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

export default function ExploreDrinksIngredients() {
  const location = useLocation();
  const {
    getIngredientsList,
    ingredientsList,
    handleIngredientClick,
  } = useContext(AppContext);

  useEffect(() => {
    const getIngredients = async () => {
      if (location.pathname === '/explorar/comidas/ingredientes') {
        await getIngredientsList('comidas');
      } else {
        await getIngredientsList('bebidas');
      }
    };

    getIngredients();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div>
      <Header />
      <h1 data-testid="page-title">Explorar Ingredientes</h1>
      <section>
        {ingredientsList.length > 0
          && ingredientsList.map(({ ingredient, ingredientImg }, index) => (
            <div
              aria-hidden="true"
              key={ index }
              onClick={ () => handleIngredientClick('bebidas', ingredient) }
            >
              <RecipeCard
                key={ ingredient }
                image={ ingredientImg }
                title={ ingredient }
                index={ index }
                cardType="ingredient"
              />
            </div>
          ))}
      </section>
      <Footer />
    </div>
  );
}
