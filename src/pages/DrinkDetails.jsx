import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { fetchDrinkById } from '../helpers/fetchesFromAPI';
import { getLocalStorage } from '../helpers/manageLocalStorage';
import { embedYoutube, copyText, startRecipe } from '../helpers/foodDetailsHelpers';
import AppContext from '../context/AppContext';
import RecomandationCard from '../components/RecomandationCard';

function DrinkDetails() {
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  const [drink, setDrink] = useState({});
  const [copiedLink, setCopiedLink] = useState(false);
  const [isDone, setIsDone] = useState(true);
  const [inProgress, setInProgress] = useState(true);

  const { meals } = useContext(AppContext);

  const history = useHistory();

  const MAX_RECOMENDATION = 6;
  const recomandations = meals.slice(0, MAX_RECOMENDATION);

  useEffect(() => {
    const getDrink = async () => {
      const fetchedDrink = await fetchDrinkById(id);
      setDrink(fetchedDrink);
    };
    getDrink();
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
      const cocktailsIds = Object.keys(inProgressRecipes.cocktails);
      const foundRecipe = cocktailsIds.find((recipe) => recipe === id);
      setInProgress(foundRecipe);
    }
  }, [id]);

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

  const recomandationList = () => {
    const recomandationsList = [];
    recomandations.forEach((recomandation, i) => {
      recomandationsList.push(
        <RecomandationCard
          key={ recomandation.idMeal }
          recomandation={ recomandation }
          i={ i }
          foodType="drink"
        />,
      );
    });
    return recomandationsList;
  };

  return (
    <main>
      <img src={ strDrinkThumb } alt="bebida" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{strDrink}</h1>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ () => { copyText(setCopiedLink); } }
      >
        Manda no zap

      </button>
      {copiedLink && <span data-testid="copied-link">Link copiado!</span>}
      <button data-testid="favorite-btn" type="button">Favorite</button>
      <span data-testid="recipe-category">{strAlcoholic}</span>
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
        onClick={ () => { startRecipe(history, 'drink', id); } }
        hidden={ isDone }
      >
        {inProgress ? 'Continuar Receita' : 'Iniciar Receita'}
      </button>
    </main>
  );
}

export default DrinkDetails;
