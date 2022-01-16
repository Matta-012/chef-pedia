import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import GoBackTop from '../components/GoBackTop';

export default function ExploreMealsIngredients() {
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
  }, [location.pathname]);

  return (
    <div>
      <section className="flex justify-between mb-3">
        <GoBackTop
          pageName="Explorar Ingredientes"
          btnClasses="p-4"
          dataTest="page-title"
        />
        <div className="mr-5 md:mr-0">
          <Header />
        </div>
      </section>

      <section className="grid grid-cols-2 gap-5 px-4 mb-6 sm:grid-cols-3 lg:grid-cols-4">
        {ingredientsList.length > 0
          && ingredientsList.map(({ ingredient, ingredientImg }, index) => (
            <div
              aria-hidden="true"
              key={ index }
              onClick={ () => handleIngredientClick('comidas', ingredient) }
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
