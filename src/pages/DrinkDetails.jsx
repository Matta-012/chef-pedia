import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { fetchDrinkById } from '../helpers/fetchesFromAPI';
import AppContext from '../context/AppContext';

function DrinkDetails() {
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  const [drink, setDrink] = useState({});
  const [copiedLink, setCopiedLink] = useState(false);

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

  const recomandationList = () => {
    const recomandationsList = [];
    recomandations.forEach((recomandation, i) => {
      recomandationsList.push(
        <li
          key={ recomandation.idMeal }
          data-testid={ `${i}-recomendation-card` }
          hidden={ !(i === 0 || i === 1) }
        >
          <Link to={ `/comidas/${recomandation.idMeal}` }>
            <img
              src={ recomandation.strMealThumb }
              alt="recomendation"
            />
            <h3 data-testid={ `${i}-recomendation-title` }>{recomandation.strMeal}</h3>
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
    setTimeout(() => {
      setCopiedLink(false);
    }, INTERVAL_TIME);
  };

  const startRecipe = () => {
    history.push(`/bebidas/${id}/in-progress`);
  };

  return (
    <main>
      <img src={ strDrinkThumb } alt="bebida" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{strDrink}</h1>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ copyText }
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

export default DrinkDetails;
