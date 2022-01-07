import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { fetchDrinkById } from '../helpers/fetchesFromAPI';
import { getLocalStorage, saveLocalStorage } from '../helpers/manageLocalStorage';

function DrinkInProgress() {
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  const [drink, setDrink] = useState({});
  const [copiedLink, setCopiedLink] = useState(false);
  const [recipeFinished, setRecipeFinished] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const getDrink = async () => {
      const fetchedDrink = await fetchDrinkById(id);
      setDrink(fetchedDrink);
    };
    getDrink();
  }, [id]);

  const { strDrinkThumb, strDrink, strAlcoholic, strInstructions } = drink;

  const verifyCheckbox = () => {
    const ingredients = document.getElementsByClassName('ingredient-checkbox');
    const ingredientsArr = [];
    for (let i = 0; i < ingredients.length; i += 1) {
      ingredientsArr.push(ingredients[i].checked);
    }
    const allDone = ingredientsArr.every((element) => element === true);
    setRecipeFinished(allDone);
  };

  const getIngredientsList = () => {
    const ingredients = [];
    const MAX_INGREDIENTS = 20;
    const ONE = 1;
    for (let i = 1; i <= MAX_INGREDIENTS; i += 1) {
      if (drink[`strIngredient${i}`]) {
        ingredients.push(
          <label htmlFor={ `strIngredient${i}` } key={ drink[`strIngredient${i}`] }>
            {drink[`strIngredient${i}`]}
            {drink[`strMeasure${i}`]}
            <input
              key={ i }
              id={ `strIngredient${i}` }
              data-testid={ `${i - ONE}-ingredient-name-and-measure` }
              onClick={ verifyCheckbox }
              className="ingredient-checkbox"
              type="checkbox"
            />
          </label>,
        );
      }
    }
    return ingredients;
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

  const endRecipe = () => {
    const doneRecipes = getLocalStorage('doneRecipes');
    const { strCategory, strTags } = drink;
    let strNewTags;
    if (strTags) {
      strNewTags = strTags.split(',');
    } else {
      strNewTags = [];
    }

    const recipeObj = {
      id,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
      doneDate: new Date().toLocaleDateString(),
      tags: strNewTags,
    };

    if (doneRecipes) {
      doneRecipes.push(recipeObj);
      saveLocalStorage('doneRecipes', doneRecipes);
    } else {
      saveLocalStorage('doneRecipes', [recipeObj]);
    }

    const inProgressRecipes = getLocalStorage('inProgressRecipes');
    if (inProgressRecipes) {
      delete inProgressRecipes.cocktails[id];
      saveLocalStorage('inProgressRecipes', inProgressRecipes);
    }

    history.push('/receitas-feitas');
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
      <section>
        {getIngredientsList()}
      </section>
      <p data-testid="instructions">{strInstructions}</p>
      <button
        data-testid="start-recipe-btn"
        type="button"
        style={ { position: 'fixed', bottom: '0px' } }
        onClick={ endRecipe }
        disabled={ !recipeFinished }
      >
        Finalizar
      </button>
    </main>
  );
}

export default DrinkInProgress;
