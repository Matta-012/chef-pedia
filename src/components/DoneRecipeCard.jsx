import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { copyRecipeDoneText } from '../helpers/foodDetailsHelpers';
import share from '../images/whiteShareIcon.svg';
import '../styles/recipe-card.css';

function DoneRecipeCard({
  index,
  tags,
  category,
  name,
  doneDate,
  image,
  type,
  alcoholicOrNot,
  area,
  id,
}) {
  const [isCopied, setIsCopied] = useState(false);
  const hostname = window.location.hostname;

  return (
    <div className="recipe-card bg-login-bg text-white text-center rounded-xl border border-gray-300 pb-3">
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
          <div data-testid={ `${index}-horizontal-top-text` } className="mt-1">
            <span>{area}</span>
            {' - '}
            <span>{category}</span>
          </div>
        ) : (
          <div
            data-testid={ `${index}-horizontal-top-text` }
            className="mt-1"
          >
            {alcoholicOrNot}
          </div>
        )}
      <Link to={ `/${type}s/${id}` }>
        <p
          data-testid={ `${index}-horizontal-name` }
          className="font-bold text-xl"
        >
          {name}
        </p>
      </Link>
      <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
      <div className="flex justify-center font-bold">
        {isCopied && <span
          data-testid="copied-link"
        >
          Link copiado!
        </span>}
      </div>
      <button
        type="button"
        src={ share }
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ () => copyRecipeDoneText(setIsCopied, type, id, hostname) }
        className="mt-2"
      >
        <img src={ share } alt="Ícone de compartilhar" />
      </button>
      {tags
        ? (
          tags.map((tag) => (
            <p
              key={ `${tag}${index}` }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </p>
          ))
        ) : ''}
    </div>
  );
}

DoneRecipeCard.propTypes = {
  alcoholicOrNot: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  doneDate: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  tags: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  type: PropTypes.string.isRequired,
};

export default DoneRecipeCard;
