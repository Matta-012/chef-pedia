import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { fetchDrinkById } from '../helpers/fetchesFromAPI';
import { getLocalStorage } from '../helpers/manageLocalStorage';
import { embedYoutube, copyText, startRecipe } from '../helpers/foodDetailsHelpers';
import FavoriteButton from '../components/FavoriteButton';
import AppContext from '../context/AppContext';
import RecommendationCard from '../components/RecommendationCard';

function DrinkDetails() {
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  const [drink, setDrink] = useState({});
  const [copiedLink, setCopiedLink] = useState(false);
  const [isDone, setIsDone] = useState(true);
  const [inProgress, setInProgress] = useState(true);

  const { meals } = useContext(AppContext);

  const history = useHistory();

  const MAX_RECOMMENDATION = 6;
  const recommendations = meals.slice(0, MAX_RECOMMENDATION);

  console.log(drink);

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

  const recommendationList = () => {
    const recommendationsList = [];
    recommendations.forEach((recommendation, i) => {
      recommendationsList.push(
        <RecommendationCard
          key={ recommendation.idMeal }
          recommendation={ recommendation }
          i={ i }
          foodType="drink"
        />,
      );
    });
    return recommendationsList;
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
      <FavoriteButton id={ id } food={ drink } foodType="drink" />
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
      <ul>{recommendationList()}</ul>
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
