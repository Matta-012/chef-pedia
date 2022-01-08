import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { copyRecipeDoneText } from '../helpers/foodDetailsHelpers';
import share from '../images/shareIcon.svg';

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
          <span data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</span>
        )}
      <Link to={ `/${type}s/${id}` }>
        <p data-testid={ `${index}-horizontal-name` }>{name}</p>
      </Link>
      <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
      <button
        type="button"
        src={ share }
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ () => copyRecipeDoneText(setIsCopied, type, id) }
      >
        <img src={ share } alt="Icone de compartilhar" />
      </button>
      {isCopied ? <span>Link copiado!</span> : ''}
      {tags.map((tag) => (
        <p key={ index } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
      ))}
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
