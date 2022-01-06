import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { fetchMealById } from '../helpers/fetchesFromAPI';
import AppContext from '../context/AppContext';

function MealDetails() {
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  const [meal, setMeal] = useState({});
  const [copiedLink, setCopiedLink] = useState(false);

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

  const recomandationList = () => {
    const recomandationsList = [];
    recomandations.forEach((recomandation, i) => {
      recomandationsList.push(
        <li
          key={ recomandation.idDrink }
          data-testid={ `${i}-recomendation-card` }
          hidden={ !(i === 0 || i === 1) }
        >
          <Link to={ `/bebidas/${recomandation.idDrink}` }>
            <img
              src={ recomandation.strDrinkThumb }
              alt="recomendation"
            />
            <h3 data-testid={ `${i}-recomendation-title` }>{ recomandation.strDrink }</h3>
          </Link>
        </li>,
      );
    });
    return recomandationsList;
  };

  const copyText = () => {
    const fullPathName = window.location.href;
    navigator.clipboard.writeText(fullPathName);
    setCopiedLink(true);
    const INTERVAL_TIME = 3000;
    const timeOutId = setTimeout(() => {
      setCopiedLink(false);
      clearTimeout(timeOutId);
    }, INTERVAL_TIME);
  };

  const startRecipe = () => {
    history.push(`/comidas/${id}/in-progress`);
  };

  return (
    <main>
      <img src={ strMealThumb } alt="comida" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{strMeal}</h1>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ copyText }
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
        src={ embedYoutube() }
        allowFullScreen
        title="How to make"
      />
      <ul>{recomandationList()}</ul>
      <button
        data-testid="start-recipe-btn"
        type="button"
        style={ { position: 'fixed', bottom: '0px' } }
        onClick={ startRecipe }
      >
        Começar receita
      </button>
    </main>
  );
}

export default MealDetails;
