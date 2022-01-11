import PropTypes from 'prop-types';
import React from 'react';
import '../styles/recipe-card.css';

function RecipeCard({ image, title, index, cardType }) {
  return (
    <div
      data-testid={ `${index}-${cardType}-card` }
      className="rounded-xl recipe-card"
    >
      <div className="shrink-0">
        <img
          src={ image }
          alt=""
          data-testid={ `${index}-card-img` }
          className="login-bg rounded-t-xl w-full rounded-none scale-100 object-cover"
        />
      </div>
      <h2
        data-testid={ `${index}-card-name` }
        className="py-2 text-xl text-center text-white font-semibold bg-login-bg rounded-b-xl"
      >
        { title }
      </h2>
    </div>
  );
}

RecipeCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cardType: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
