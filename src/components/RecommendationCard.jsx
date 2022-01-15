import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecommendationCard({ recommendation, i, foodType }) {
  if (foodType === 'meal') {
    return (
      <li
        data-testid={ `${i}-recomendation-card` }
        hidden={ !(i === 0 || i === 1) }
        className="recipe-card border border-gray-300 rounded-xl transition duration-150 card-shadow"
      >
        <Link to={ `/bebidas/${recommendation.idDrink}` }>
          <div>
            <img
              src={ recommendation.strDrinkThumb }
              alt="recomendation"
              className="login-bg rounded-t-xl w-full rounded-none"
            />
          </div>
          <h3
            data-testid={ `${i}-recomendation-title` }
            className="py-2 text-xl text-center text-white font-semibold bg-login-bg rounded-b-xl lg:py-4 lg:text-2xl px-2"
          >
            {recommendation.strDrink}
          </h3>
        </Link>
      </li>
    );
  }
  if (foodType === 'drink') {
    return (
      <li
        data-testid={ `${i}-recomendation-card` }
        hidden={ !(i === 0 || i === 1) }
        className="recipe-card border border-gray-300 rounded-xl transition duration-150 card-shadow"
      >
        <Link to={ `/comidas/${recommendation.idMeal}` }>
          <div >
            <img
              src={ recommendation.strMealThumb }
              alt="recomendation"
              className="login-bg rounded-t-xl w-full rounded-none"
            />
          </div>
          <h3
            data-testid={ `${i}-recomendation-title` }
            className="py-2 text-xl text-center text-white font-semibold bg-login-bg rounded-b-xl lg:py-4 lg:text-2xl px-2"
          >
            {recommendation.strMeal}
          </h3>
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
