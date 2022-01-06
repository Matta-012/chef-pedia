import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecomandationCard({ recomandation, i, foodType }) {
  if (foodType === 'meal') {
    return (
      <li
        key={ recomandation.idDrink }
        data-testid={ `${i}-recomendation-card` }
        hidden={ !(i === 0 || i === 1) }
      >
        <Link to={ `/bebidas/${recomandation.idDrink}` }>
          <img
            src={ recomandation.strDrinkThumb }
            alt="recomendation"
          />
          <h3 data-testid={ `${i}-recomendation-title` }>{recomandation.strDrink}</h3>
        </Link>
      </li>
    );
  }
  if (foodType === 'drink') {
    return (
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
      </li>
    );
  }
}

RecomandationCard.propTypes = {
  i: PropTypes.number.isRequired,
  recomandation: PropTypes.shape({
    idDrink: PropTypes.number,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
};

export default RecomandationCard;
