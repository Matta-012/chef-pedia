import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchMealById } from '../helpers/fetchsFromAPI';

function MealDetails() {
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  const [meal, setMeal] = useState({});

  useEffect(() => {
    const getMeal = async () => {
      const fetchedMeal = await fetchMealById(id);
      setMeal(fetchedMeal);
    };
    getMeal();
  }, [id]);
  console.log(meal);

  const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = meal;

  const getIngredientsList = () => {
    const ingredients = [];
    const MAX_INGREDIENTS = 20;
    const ONE = 1;
    for (let i = 1; i <= MAX_INGREDIENTS; i += 1) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          <li
            key={ i }
            data-testid={ `${i - ONE}-ingredient-name-and-measure` }
          >
            {meal[`strIngredient${i}`]}
            {meal[`strMeasure${i}`]}
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
    return '#';
  };

  return (
    <main>
      <img src={ strMealThumb } alt="comida" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{strMeal}</h1>
      <button data-testid="share-btn" type="button">Manda no zap</button>
      <button data-testid="favorite-btn" type="button">Favorite</button>
      <span data-testid="recipe-category">{strCategory}</span>
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

export default MealDetails;
