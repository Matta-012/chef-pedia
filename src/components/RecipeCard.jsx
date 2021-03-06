import PropTypes from 'prop-types';
import React from 'react';
import '../styles/recipe-card.css';
import '../styles/default-font.css';

function RecipeCard({ image, title, index, cardType }) {
  return (
    <div
      data-testid={ `${index}-${cardType}-card` }
      className="recipe-card border border-gray-300 rounded-xl transition duration-150 card-shadow"
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
        className="py-2 text-xl text-center text-white font-semibold bg-login-bg rounded-b-xl lg:py-4 lg:text-2xl px-2"
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
