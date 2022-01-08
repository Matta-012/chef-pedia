import { getLocalStorage, saveLocalStorage } from './manageLocalStorage';

const embedYoutube = (strYoutube) => {
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

const copyText = (setCopiedLink) => {
  const fullPathName = window.location.href;
  navigator.clipboard.writeText(fullPathName);
  setCopiedLink(true);
  const INTERVAL_TIME = 3000;
  const timeOutId = setTimeout(() => {
    setCopiedLink(false);
    clearTimeout(timeOutId);
  }, INTERVAL_TIME);
};

const copyRecipeDoneText = (setCopiedLink, type, id) => {
  const fullPathName = `http://localhost:3000/${type}s/${id}`;
  navigator.clipboard.writeText(fullPathName);
  setCopiedLink(true);
  const INTERVAL_TIME = 3000;
  const timeOutId = setTimeout(() => {
    setCopiedLink(false);
    clearTimeout(timeOutId);
  }, INTERVAL_TIME);
};

const startRecipe = (history, foodType, id) => {
  if (foodType === 'drink') {
    const inProgressRecipes = getLocalStorage('inProgressRecipes');

    if (inProgressRecipes) {
      const newCocktails = { ...inProgressRecipes.cocktails, [id]: [] };
      saveLocalStorage(
        'inProgressRecipes', { ...inProgressRecipes, cocktails: newCocktails },
      );
    } else {
      const cocktails = { [id]: [] };
      saveLocalStorage('inProgressRecipes', { meals: {}, cocktails });
    }
    history.push(`/bebidas/${id}/in-progress`);
  }

  if (foodType === 'meal') {
    const inProgressRecipes = getLocalStorage('inProgressRecipes');
    if (inProgressRecipes) {
      const newMeals = { ...inProgressRecipes.meals, [id]: [] };
      saveLocalStorage(
        'inProgressRecipes', { ...inProgressRecipes, meals: newMeals },
      );
    } else {
      const meals = { [id]: [] };
      saveLocalStorage('inProgressRecipes', { meals, cocktails: {} });
    }
    history.push(`/comidas/${id}/in-progress`);
  }
};

export { embedYoutube, copyText, startRecipe, copyRecipeDoneText };
