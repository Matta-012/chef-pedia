import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchDrinkById } from '../helpers/fetchsFromAPI';

function DrinkDetails() {
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  const [drink, setDrink] = useState({});

  useEffect(() => {
    const getDrink = async () => {
      const fetchedDrink = await fetchDrinkById(id);
      setDrink(fetchedDrink);
    };
    getDrink();
  }, [id]);
  console.log(drink);

  const { strDrinkThumb, strDrink, strAlcoholic, strInstructions, strYoutube } = drink;

  const getIngredientsList = () => {
    const ingredients = [];
    const MAX_INGREDIENTS = 20;
    const ONE = 1;
    for (let i = 1; i <= MAX_INGREDIENTS; i += 1) {
      if (drink[`strIngredient${i}`]) {
        ingredients.push(
          <li
            key={ i }
            data-testid={ `${i - ONE}-ingredient-name-and-measure` }
          >
            {drink[`strIngredient${i}`]}
            {drink[`strMeasure${i}`]}
          </li>,
        );
      }
    }
    return ingredients;
  };

  const embedYoutube = () => {
    if (strYoutube) {
      const youtubeId = strYoutube.split('v=')[1];
      const ampersandPosition = youtubeId.indexOf('&');
      const NEGATIV_ONE = -1;
      if (ampersandPosition !== NEGATIV_ONE) {
        youtubeId.slice(0, ampersandPosition);
      }
      return `https://www.youtube.com/embed/${youtubeId}`;
    }
    return '';
  };

  return (
    <main>
      <img src={ strDrinkThumb } alt="bebida" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{strDrink}</h1>
      <button data-testid="share-btn" type="button">Manda no zap</button>
      <button data-testid="favorite-btn" type="button">Favorite</button>
      <span data-testid="recipe-category">{strAlcoholic}</span>
      <ul>
        {getIngredientsList()}
      </ul>
      <p data-testid="instructions">{strInstructions}</p>
      <iframe
        data-testid="video"
        src={ embedYoutube() }
        allowFullScreen
        title="How to make"
      />
      <span data-testid="0-recomendation-card"> Recomendações </span>
      <button data-testid="start-recipe-btn" type="button">Favorite</button>
    </main>
  );
}

export default DrinkDetails;
