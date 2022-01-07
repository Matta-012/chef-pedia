import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { fetchDrinkById } from '../helpers/fetchesFromAPI';
import { getLocalStorage, saveLocalStorage } from '../helpers/manageLocalStorage';
import FavoriteButton from '../components/FavoriteButton';
import IngredientCheckbox from '../components/IngredientCheckbox';

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
    for (let i = 1; i <= MAX_INGREDIENTS; i += 1) {
      if (drink[`strIngredient${i}`]) {
        ingredients.push(
          <IngredientCheckbox
            key={ drink[`strIngredient${i}`] }
            foodType="drink"
            food={ drink }
            verifyCheckbox={ verifyCheckbox }
            i={ i }
          />,
        );
      }
    }
    return ingredients;
  };

  const copyText = () => {
    const fullPathName = window.location.href;
    const textToCopy = fullPathName.replace('/in-progress', '');
    navigator.clipboard.writeText(textToCopy);
    setCopiedLink(true);
    const INTERVAL_TIME = 3000;
    setTimeout(() => {
      setCopiedLink(false);
    }, INTERVAL_TIME);
  };

  const endRecipe = () => {
    const doneRecipes = getLocalStorage('doneRecipes');
    const { strTags, strCategory } = drink;

    const recipeObj = {
      id,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
      doneDate: new Date().toLocaleDateString(),
      tags: strTags ? [...strTags] : [],
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
      <FavoriteButton id={ id } food={ drink } foodType="drink" />
      <span data-testid="recipe-category">{strAlcoholic}</span>
      <section>
        {getIngredientsList()}
      </section>
      <p data-testid="instructions">{strInstructions}</p>
      <button
        data-testid="finish-recipe-btn"
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
