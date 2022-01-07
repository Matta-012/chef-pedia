import PropTypes from 'prop-types';
import React from 'react';

function RecipeCard({ image, title, index, cardType }) {
  return (
    <div data-testid={ `${index}-${cardType}-card` }>
      <img
        src={ image }
        alt=""
        style={ { width: '200px' } }
        data-testid={ `${index}-card-img` }
      />
      <h2 data-testid={ `${index}-card-name` }>{ title }</h2>
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
