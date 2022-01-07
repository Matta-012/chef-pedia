import PropTypes from 'prop-types';
import React from 'react';

function DoneRecipeCard({
  index,
  tags,
  category,
  name,
  doneDate,
  image,

}) {
  return (
    <div>
      <img
        src={ image }
        alt="imagem"
        data-testid={ `${index}-horizontal-image` }
        style={ { width: '250px' } }
      />
      <p data-testid={ `${index}-horizontal-top-text` }>{category}</p>
      <p data-testid={ `${index}-horizontal-name` }>{name}</p>
      <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
      <p data-testid={ `${index}-horizontal-share-btn` }>Share</p>
      {tags.map((tag) => (
        <p key={ index } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
      ))}
    </div>
  );
}

DoneRecipeCard.propTypes = {
  category: PropTypes.string.isRequired,
  doneDate: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  tags: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

export default DoneRecipeCard;
