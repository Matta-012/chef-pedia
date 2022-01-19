const toggleFinishButton = (setRecipeFinished) => {
  const ingredients = document.querySelectorAll('.ingredient-checkbox');
  const ingredientsArr = [];
  for (let i = 0; i < ingredients.length; i += 1) {
    ingredientsArr.push(ingredients[i].checked);
  }

  if (ingredientsArr.length === 0) {
    setRecipeFinished(false);
  } else {
    const allDone = ingredientsArr.every((element) => element === true);
    setRecipeFinished(allDone);
  }
};

export default toggleFinishButton;