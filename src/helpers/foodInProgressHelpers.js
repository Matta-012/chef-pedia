const toggleFinishButton = (setRecipeFinished) => {
  const ingredients = document.getElementsByClassName('ingredient-checkbox');
  const ingredientsArr = [];
  for (let i = 0; i < ingredients.length; i += 1) {
    ingredientsArr.push(ingredients[i].checked);
  }
  const allDone = ingredientsArr.every((element) => element);
  setRecipeFinished(allDone);
};

export default toggleFinishButton;