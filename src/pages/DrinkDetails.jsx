import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { fetchDrinkById } from '../helpers/fetchesFromAPI';
import { getLocalStorage } from '../helpers/manageLocalStorage';
import { embedYoutube, copyText, startRecipe } from '../helpers/foodDetailsHelpers';
import AppContext from '../context/AppContext';
import FavoriteButton from '../components/FavoriteButton';
import RecommendationCard from '../components/RecommendationCard';
import shareIcon from '../images/shareIcon.svg';

import GoBackTop from '../components/GoBackTop';
import '../styles/default-font.css';

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
    } else {
      setInProgress(false);
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
            <span className="font-bold text-titles-text">
              {drink[`strIngredient${i}`]}
            </span>
            {' - '}
            <span className="font-bold text-titles-text">
              { drink[`strMeasure${i}`]}
            </span>
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
    <main className="font-wrapper">
      <GoBackTop
        pageName={strDrink}
        btnClasses="p-4"
      />
      <img
        src={ strDrinkThumb }
        alt="bebida"
        data-testid="recipe-photo"
        className="rounded-b-2xl phone-g:max-w-max-g mx-auto"
      />
      <div className="flex justify-center mt-4 font-bold">
        {copiedLink && <span
          data-testid="copied-link"
        >
          Link copiado!
        </span>}
      </div>
      <div className="w-11/12 mx-auto my-3 md:w-3/4 lg:max-w-[1024px]">
        <div className="w-full flex justify-between">
          <h1
            data-testid="recipe-title"
            className="font-bold text-titles-text text-xl w-9/12"
          >
            {strDrink}
          </h1>
          <div className="w-1/5 flex justify-between">
            <button
              data-testid="share-btn"
              type="button"
              onClick={ () => { copyText(setCopiedLink); } }
            >
              <img src={shareIcon} alt="Ícone de compartilhar" />
            </button>
            <FavoriteButton id={ id } food={ drink } foodType="drink" />
          </div>
        </div>
        <div className="mb-4">
          <span
            data-testid="recipe-category"
          >
            {strAlcoholic}
          </span>
        </div>

        <div>
          <ul className="text-center mb-4">
            {getIngredientsList()}
          </ul>
          <p
            data-testid="instructions"
            className="text-center mx-2 mb-8 border border-gray-200 p-3 rounded-lg"
          >
            {strInstructions}
          </p>
          <iframe
            data-testid="video"
            src={ embedYoutube(strYoutube) }
            allowFullScreen
            title="How to make"
            className="mx-auto my-6 p-2 border border-gray-200 rounded-md w-11/12 phone-p:h-[155px] phone-m:h-[180px] phone-g:h-[210px] tab-p:h-[260px] tab:h-[300px] laptop:h-[400px] laptop-g:h-[450px]"
          />
          <h2 className="flex justify-center text-2xl text-titles-text mb-6">
            Recomendações
          </h2>
          <ul className="grid grid-cols-2 gap-4 mb-20">
            {recommendationList()}
          </ul>
        </div>
      </div>

      <div className="fixed bottom-5 w-full px-2 flex justify-center">
        <button
          data-testid="start-recipe-btn"
          type="button"
          onClick={ () => { startRecipe(history, 'drink', id); } }
          hidden={ isDone }
          className="border border-login-bg text-login-bg rounded-md hover:bg-login-bg hover:text-white transition duration-200 bg-white py-2 w-full tab:w-[745px]"
        >
          {inProgress ? 'Continuar Receita' : 'Iniciar Receita'}
        </button>
      </div>
      
    </main>
  );
}

export default DrinkDetails;
