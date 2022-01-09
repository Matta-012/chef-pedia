import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { copyRecipeDoneText } from '../helpers/foodDetailsHelpers';
import share from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

function FavoriteRecipeCard({
  index,
  category,
  name,
  image,
  type,
  alcoholicOrNot,
  area,
  id,
  deleteFromLocalStorage,
}) {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <div>
      <Link to={ `/${type}s/${id}` }>
        <img
          src={ image }
          alt="imagem"
          data-testid={ `${index}-horizontal-image` }
          style={ { width: '250px' } }
        />
      </Link>

      {type === 'comida'
        ? (
          <div data-testid={ `${index}-horizontal-top-text` }>
            <span>{area}</span>
            {' - '}
            <span>{category}</span>
          </div>
        ) : (
          <div data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</div>
        )}
      <Link to={ `/${type}s/${id}` }>
        <p data-testid={ `${index}-horizontal-name` }>{name}</p>
      </Link>

      {isCopied ? <div>Link copiado!</div> : ''}
      <button
        type="button"
        src={ share }
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ () => copyRecipeDoneText(setIsCopied, type, id) }
      >
        <img src={ share } alt="ícone de compartilhar" />
      </button>

      <button
        type="button"
        onClick={ () => deleteFromLocalStorage(id) }
      >
        <img
          src={ blackHeart }
          alt="Ícone de desfavoritar"
          data-testid={ `${index}-horizontal-favorite-btn` }
        />
      </button>
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  alcoholicOrNot: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  deleteFromLocalStorage: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default FavoriteRecipeCard;
