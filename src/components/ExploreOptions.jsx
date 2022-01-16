import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { fetchRandomMealOrDrink } from '../helpers/fetchesFromAPI';

const RANDOM_MEAL_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
const RANDOM_DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

function ExploreOptions({ ingredientsBtnClasses, surpriseMeClasses, areaBtnClasses }) {
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
    <section className="h-5/6 flex flex-col items-center">
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => handleRoute(`/explorar/${routePath}/ingredientes`) }
        className={ ingredientsBtnClasses }
      >
        Por Ingredientes
      </button>

      {shouldDisplayAreaBtn && (
        <button
          type="button"
          data-testid="explore-by-area"
          onClick={ () => handleRoute(`/explorar/${routePath}/area`) }
          className={ areaBtnClasses }
        >
          Por Local de Origem
        </button>
      )}

      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ handleSurpriseMeBtn }
        className={ surpriseMeClasses }
      >
        Me Surpreenda!
      </button>
    </section>
  );
}

export default ExploreOptions;
