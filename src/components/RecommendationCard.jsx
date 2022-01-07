import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecommendationCard({ recommendation, i, foodType }) {
  if (foodType === 'meal') {
    return (
      <li
        data-testid={ `${i}-recomendation-card` }
        hidden={ !(i === 0 || i === 1) }
      >
        <Link to={ `/bebidas/${recommendation.idDrink}` }>
          <img
            src={ recommendation.strDrinkThumb }
            alt="recomendation"
          />
          <h3 data-testid={ `${i}-recomendation-title` }>{recommendation.strDrink}</h3>
        </Link>
      </li>
    );
  }
  if (foodType === 'drink') {
    return (
      <li
        data-testid={ `${i}-recomendation-card` }
        hidden={ !(i === 0 || i === 1) }
      >
        <Link to={ `/comidas/${recommendation.idMeal}` }>
          <img
            src={ recommendation.strMealThumb }
            alt="recomendation"
          />
          <h3 data-testid={ `${i}-recomendation-title` }>{recommendation.strMeal}</h3>
        </Link>
      </li>
    );
  }
}

RecommendationCard.propTypes = {
  i: PropTypes.number.isRequired,
  recommendation: PropTypes.shape({
    idDrink: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
};

export default RecommendationCard;
