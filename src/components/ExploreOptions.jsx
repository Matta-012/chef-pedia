import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { fetchRandomMealOrDrink } from '../helpers/fetchesFromAPI';

const RANDOM_MEAL_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
const RANDOM_DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

function ExploreOptions() {
  const [shouldDisplayAreaBtn, setShouldDisplayAreaBtn] = useState('');
  const [routePath, setRoutePath] = useState('');
  const { handleRoute } = useContext(AppContext);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/explorar/bebidas') {
      setShouldDisplayAreaBtn(false);
      setRoutePath('bebidas');
    } else {
      setShouldDisplayAreaBtn(true);
      setRoutePath('comidas');
    }
  }, [location.pathname]);

  const handleSurpriseMeBtn = async () => {
    if (routePath === 'comidas') {
      const { meals: [{ idMeal }] } = await fetchRandomMealOrDrink(RANDOM_MEAL_URL);
      handleRoute(`/${routePath}/${idMeal}`);
    } else {
      const { drinks: [{ idDrink }] } = await fetchRandomMealOrDrink(RANDOM_DRINK_URL);
      handleRoute(`/${routePath}/${idDrink}`);
    }
  };

  return (
    <section>
      <button
        type="button"
        value={ `/explorar/${routePath}/ingredientes` }
        data-testid="explore-by-ingredient"
        onClick={ ({ target }) => handleRoute(target.value) }
      >
        Por Ingredientes
      </button>

      {shouldDisplayAreaBtn && (
        <button
          type="button"
          value={ `/explorar/${routePath}/area` }
          data-testid="explore-by-area"
          onClick={ ({ target }) => handleRoute(target.value) }
        >
          Por Local de Origem
        </button>
      )}

      <button
        type="button"
        value={ `${routePath}` }
        data-testid="explore-surprise"
        onClick={ handleSurpriseMeBtn }
      >
        Me Surpreenda!
      </button>
    </section>
  );
}

export default ExploreOptions;
