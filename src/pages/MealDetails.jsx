import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { fetchMealById } from '../helpers/fetchesFromAPI';
import { getLocalStorage } from '../helpers/manageLocalStorage';
import AppContext from '../context/AppContext';
import { embedYoutube, copyText, startRecipe } from '../helpers/foodDetailsHelpers';
import RecomandationCard from '../components/RecomandationCard';

function MealDetails() {
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  const [meal, setMeal] = useState({});
  const [copiedLink, setCopiedLink] = useState(false);
  const [isDone, setIsDone] = useState(true);
  const [inProgress, setInProgress] = useState(false);

  const history = useHistory();

  const MAX_RECOMENDATION = 6;

  const { drinks } = useContext(AppContext);

  useEffect(() => {
    const getMeal = async () => {
      const fetchedMeal = await fetchMealById(id);
      setMeal(fetchedMeal);
    };
    getMeal();
  }, [id]);

  useEffect(() => {
    const doneRecipes = getLocalStorage('doneRecipes');
    if (doneRecipes) {
      const foundRecipe = doneRecipes.find((recipe) => recipe.id === id);
      setIsDone(foundRecipe);
    } else {
      setIsDone(false);
    }
  }, [id]);

  useEffect(() => {
    const inProgressRecipes = getLocalStorage('inProgressRecipes');
    if (inProgressRecipes) {
      const mealsIds = Object.keys(inProgressRecipes.meals);
      const foundRecipe = mealsIds.find((recipe) => recipe === id);
      setInProgress(foundRecipe);
    }
  }, [id]);

  const recomandations = drinks.slice(0, MAX_RECOMENDATION);
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

  const recomandationList = () => {
    const recomandationsList = [];
    recomandations.forEach((recomandation, i) => {
      recomandationsList.push(
        <RecomandationCard
          key={ recomandation.idDrink }
          recomandation={ recomandation }
          i={ i }
          foodType="meal"
        />,
      );
    });
    return recomandationsList;
  };

  return (
    <main>
      <img src={ strMealThumb } alt="comida" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{strMeal}</h1>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ () => { copyText(setCopiedLink); } }
      >
        Manda no zap

      </button>
      {copiedLink && <span data-testid="copied-link">Link copiado!</span>}
      <button data-testid="favorite-btn" type="button">Favorite ♡</button>
      <span data-testid="recipe-category">{strCategory}</span>
      <ul>
        {getIngredientsList()}
      </ul>
      <p data-testid="instructions">{strInstructions}</p>
      <iframe
        data-testid="video"
        src={ embedYoutube(strYoutube) }
        allowFullScreen
        title="How to make"
      />
      <ul>{recomandationList()}</ul>
      <button
        data-testid="start-recipe-btn"
        type="button"
        style={ { position: 'fixed', bottom: '0px' } }
        onClick={ () => { startRecipe(history, 'meal', id); } }
        hidden={ isDone }
      >
        {inProgress ? 'Continuar Receita' : 'Iniciar Receita'}
      </button>
    </main>
  );
}

export default MealDetails;
