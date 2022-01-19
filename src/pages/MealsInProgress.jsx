import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { fetchMealById } from '../helpers/fetchesFromAPI';
import { getLocalStorage, saveLocalStorage } from '../helpers/manageLocalStorage';
import FavoriteButton from '../components/FavoriteButton';
import IngredientCheckbox from '../components/IngredientCheckbox';
import toggleFinishButton from '../helpers/foodInProgressHelpers';
import GoBackTop from '../components/GoBackTop';
import '../styles/default-font.css';
import shareIcon from '../images/shareIcon.svg';
import Footer from '../components/Footer';

function MealInProgress() {
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  const [meal, setMeal] = useState({});
  const [copiedLink, setCopiedLink] = useState(false);
  const [recipeFinished, setRecipeFinished] = useState(false);
  const [markedIngredients, setMarkedIngredients] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const getMeal = async () => {
      const fetchedMeal = await fetchMealById(id);
      setMeal(fetchedMeal);
    };
    toggleFinishButton(setRecipeFinished);
    getMeal();
  }, [id]);
  
  useEffect(() => {
    const inProgressRecipes = getLocalStorage('inProgressRecipes');
    if (inProgressRecipes) {
      setMarkedIngredients(inProgressRecipes.meals[id]);
    }
  }, [id]);

  const { strMealThumb, strMeal, strCategory, strInstructions } = meal;

  const getIngredientsList = () => {
    const ingredients = [];
    const MAX_INGREDIENTS = 20;
    for (let i = 1; i <= MAX_INGREDIENTS; i += 1) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          <IngredientCheckbox
            key={ meal[`strIngredient${i}`] }
            foodType="meals"
            food={ meal }
            isChecked={ markedIngredients.includes(i) }
            toggleFinishButton={ () => { toggleFinishButton(setRecipeFinished); } }
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

  const doneRecipes = getLocalStorage('doneRecipes');

  if (doneRecipes) {
    const doneRecipe = doneRecipes.some(recipe => recipe.id === id);
    if (doneRecipe) {
      return (
        <div className="container">
          <GoBackTop pageName="Receita feita"/>
          <h1>
            Essa receita já foi feita.
          </h1>
          <Footer />
        </div>
      )
    }
  }

  return (
    <main className="font-wrapper">
      <GoBackTop
        pageName={strMeal}
        btnClasses="p-4"
      />
      <img
        src={ strMealThumb }
        alt="comida"
        data-testid="recipe-photo"
        className="rounded-b-2xl phone-g:max-w-max-g mx-auto"
      />

      <div className="w-11/12 mx-auto my-3 md:w-3/4 lg:max-w-[1024px]">
        <div className="w-full flex flex-col items-center mb-8">
          <h1
            data-testid="recipe-title"
            className="font-bold text-titles-text text-xl w-9/12 text-center"
          >
              {strMeal}
          </h1>

          <div className="mb-4">
            <span data-testid="recipe-category">{strCategory}</span>
          </div>

          <div className="flex justify-center font-bold">
            {copiedLink && <span
              data-testid="copied-link"
              className="mb-4"
            >
              Link copiado!
            </span>}
          </div>

          <div className="w-1/5 flex justify-between">
            <button
              data-testid="share-btn"
              type="button"
              onClick={ copyText }
            >
              <img src={shareIcon} alt="Ícone de compartilhar" />
            </button>
            <FavoriteButton id={ id } food={ meal } foodType="meal" />
          </div>
        </div>
      </div>
      
      <section className="flex flex-col items-center mb-4">
        {getIngredientsList()}
      </section>

      <p
        data-testid="instructions"
        className="text-center mx-2 mb-8 border border-gray-200 p-3 rounded-lg"
      >
        {strInstructions}
      </p>

      <div className="w-full flex justify-center">
        <button
          data-testid="finish-recipe-btn"
          type="button"
          onClick={ endRecipe }
          disabled={ !recipeFinished }
          className="border border-login-bg text-login-bg rounded-md hover:bg-login-bg hover:text-white transition duration-200 bg-white py-2 w-11/12 tab:w-[745px] mb-6 mx-auto disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Finalizar
        </button>
      </div>
    </main>
  );
}

export default MealInProgress;
