import PropTypes from 'prop-types';
import React, { useState } from 'react';

function IngredientCheckbox({ foodType, food, verifyCheckbox, i }) {
  const ONE = 1;

  const [checked, setChecked] = useState(false);

  if (foodType === 'meal') {
    return (
      <label
        htmlFor={ `strIngredient${i}` }
        data-testid="ingredient-step"
      >
        {food[`strIngredient${i}`]}
        {food[`strMeasure${i}`]}
        <input
          id={ `strIngredient${i}` }
          data-testid={ `${i - ONE}-ingredient-name-and-measure` }
          onClick={ (e) => {
            verifyCheckbox(e);
            setChecked(!checked);
          } }
          className="ingredient-checkbox"
          value={ checked }
          type="checkbox"
        />
      </label>
    );
  }
  return (
    <label
      htmlFor={ `strIngredient${i}` }
      key={ food[`strIngredient${i}`] }
      data-testid="ingredient-step"
    >
      {food[`strIngredient${i}`]}
      {food[`strMeasure${i}`]}
      <input
        key={ i }
        id={ `strIngredient${i}` }
        data-testid={ `${i - ONE}-ingredient-name-and-measure` }
        onClick={ (e) => { verifyCheckbox(e); } }
        className="ingredient-checkbox"
        type="checkbox"
      />
    </label>
  );
}

IngredientCheckbox.propTypes = {
  i: PropTypes.number.isRequired,
  food: PropTypes.objectOf(PropTypes.any).isRequired,
  foodType: PropTypes.string.isRequired,
  verifyCheckbox: PropTypes.func.isRequired,
};

export default IngredientCheckbox;
