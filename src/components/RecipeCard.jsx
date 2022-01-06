import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard({ image, title, index, id, recipe }) {
  return (
    <Link to={ `/${recipe}/${id}` }>
      <div data-testid={ `${index}-recipe-card` }>
        <img
          src={ image }
          alt=""
          style={ { width: '200px' } }
          data-testid={ `${index}-card-img` }
        />
        <h2 data-testid={ `${index}-card-name` }>{ title }</h2>
      </div>
    </Link>
  );
}

RecipeCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  recipe: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default RecipeCard;
