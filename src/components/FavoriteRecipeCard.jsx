import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { copyRecipeDoneText } from '../helpers/foodDetailsHelpers';
import share from '../images/whiteShareIcon.svg';
import blackHeart from '../images/heartIcon.svg';
import '../styles/recipe-card.css';

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
    <div className="recipe-card text-white bg-login-bg text-center rounded-xl border border-gray-300 pb-3">
      <Link to={ `/${type}s/${id}` }>
        <img
          src={ image }
          alt="imagem"
          data-testid={ `${index}-horizontal-image` }
          style={ { width: '250px' } }
          className="rounded-t-xl"
        />
      </Link>

      {type === 'comida'
        ? (
          <div
            data-testid={ `${index}-horizontal-top-text` }
            className="p-1"
          >
            <span>{area}</span>
            {' - '}
            <span>{category}</span>
          </div>
        ) : (
          <div
            data-testid={ `${index}-horizontal-top-text` }
            className="p-1"
          >
            {alcoholicOrNot}
          </div>
        )}
      <Link to={ `/${type}s/${id}` }>
        <p
          data-testid={ `${index}-horizontal-name` }
          className="text-xl font-bold mb-3"
        >
          {name}
        </p>
      </Link>

      <div className="flex justify-center font-bold">
        {isCopied && <span
          data-testid="copied-link"
          className="mb-4"
        >
          Link copiado!
        </span>}
      </div>
      <div className="w-1/2 mx-auto flex justify-between mb-2">
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
