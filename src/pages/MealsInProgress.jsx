import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { fetchMealById } from '../helpers/fetchesFromAPI';
import { getLocalStorage, saveLocalStorage } from '../helpers/manageLocalStorage';
import FavoriteButton from '../components/FavoriteButton';
import IngredientCheckbox from '../components/IngredientCheckbox';

function MealInProgress() {
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  const [meal, setMeal] = useState({});
  const [copiedLink, setCopiedLink] = useState(false);
  const [recipeFinished, setRecipeFinished] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const getMeal = async () => {
      const fetchedMeal = await fetchMealById(id);
      setMeal(fetchedMeal);
    };
    getMeal();
  }, [id]);

  const { strMealThumb, strMeal, strCategory, strInstructions } = meal;

  const verifyCheckbox = ({ target }) => {
    const ingredients = document.getElementsByClassName('ingredient-checkbox');
    console.log(target);
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
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          <IngredientCheckbox
            key={ meal[`strIngredient${i}`] }
            foodType="meal"
            food={ meal }
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
    const timeOutId = setTimeout(() => {
      setCopiedLink(false);
      clearTimeout(timeOutId);
    }, INTERVAL_TIME);
  };

  const endRecipe = () => {
    const doneRecipes = getLocalStorage('doneRecipes');
    const { strArea, strTags } = meal;
    const strNewTags = strTags.split(',');

    const recipeObj = {
      id,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
      doneDate: new Date().toLocaleDateString(),
      tags: strTags ? strNewTags : [],
    };

    if (doneRecipes) {
      doneRecipes.push(recipeObj);
      saveLocalStorage('doneRecipes', doneRecipes);
    } else {
      saveLocalStorage('doneRecipes', [recipeObj]);
    }

    const inProgressRecipes = getLocalStorage('inProgressRecipes');
    if (inProgressRecipes) {
      delete inProgressRecipes.meals[id];
      saveLocalStorage('inProgressRecipes', inProgressRecipes);
    }

    history.push('/receitas-feitas');
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
      <FavoriteButton id={ id } food={ meal } foodType="meal" />
      <span data-testid="recipe-category">{strCategory}</span>
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

export default MealInProgress;
