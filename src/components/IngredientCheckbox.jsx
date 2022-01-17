import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { getLocalStorage, saveLocalStorage } from '../helpers/manageLocalStorage';

function IngredientCheckbox({ foodType, food, isChecked, toggleFinishButton, i }) {
  const ONE = 1;

  const [checked, setChecked] = useState(isChecked);

  const id = foodType === 'meals' ? food.idMeal : food.idDrink;

  const toggleLocalStorage = () => {
    const inProgressRecipes = getLocalStorage('inProgressRecipes');
    if (inProgressRecipes) {
      if (!checked) {
        inProgressRecipes[foodType][id] = [...inProgressRecipes[foodType][id], i];
        saveLocalStorage('inProgressRecipes', inProgressRecipes);
      } else {
        inProgressRecipes[foodType][id] = inProgressRecipes[foodType][id]
          .filter((oldIndex) => i !== oldIndex);
        saveLocalStorage('inProgressRecipes', inProgressRecipes);
      }
    } else {
      const newinProgressRecipes = {
        meals: {},
        cocktails: {},
      };
      newinProgressRecipes[foodType][id] = [i];
      saveLocalStorage('inProgressRecipes', newinProgressRecipes);
    }
  };

  const handleCheckboxChange = () => {
    toggleFinishButton();
    setChecked(!checked);
    toggleLocalStorage();
  };

  const riskedIngredientStyle = { textDecoration: 'line-through' };

  if (foodType === 'meals') {
    return (
      <label
        htmlFor={ `strIngredient${i}` }
        key={ food[`strIngredient${i}`] }
        style={ checked ? riskedIngredientStyle : {} }
        data-testid={ `${i - ONE}-ingredient-step` }
      >
        {food[`strIngredient${i}`]}
        {food[`strMeasure${i}`]}
        <input
          id={ `strIngredient${i}` }
          onClick={ handleCheckboxChange }
          className="ingredient-checkbox"
          defaultChecked={ checked }
          type="checkbox"
        />
      </label>
    );
  }
  return (
    <label
      htmlFor={ `strIngredient${i}` }
      key={ food[`strIngredient${i}`] }
      style={ checked ? { textDecoration: 'line-through' } : {} }
      data-testid={ `${i - ONE}-ingredient-step` }
    >
      {food[`strIngredient${i}`]}
      {food[`strMeasure${i}`]}
      <input
        key={ i }
        id={ `strIngredient${i}` }
        onClick={ handleCheckboxChange }
        className="ingredient-checkbox"
        defaultChecked={ checked }
        type="checkbox"
      />
    </label>
  );
}

IngredientCheckbox.propTypes = {
  i: PropTypes.number.isRequired,
  isChecked: PropTypes.bool.isRequired,
  food: PropTypes.objectOf(PropTypes.any).isRequired,
  foodType: PropTypes.string.isRequired,
  toggleFinishButton: PropTypes.func.isRequired,
};

export default IngredientCheckbox;