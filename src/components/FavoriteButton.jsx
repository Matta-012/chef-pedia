import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { getLocalStorage, saveLocalStorage } from '../helpers/manageLocalStorage';
import { createFavoriteObj, isRecipeFavorite } from '../helpers/favoriteHelpers';

function FavoriteButton({ id, food, foodType }) {
  const [isFavorite, setIsFavorite] = useState(true);

  useEffect(() => {
    setIsFavorite(isRecipeFavorite(id));
  }, [id]);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    const favorites = getLocalStorage('favoriteRecipes');
    const favoriteObj = createFavoriteObj(food, foodType);

    if (!isFavorite) {
      if (!favorites) {
        saveLocalStorage('favoriteRecipes', [favoriteObj]);
      } else {
        const newFavorites = [...favorites, favoriteObj];
        favorites.push(favoriteObj);
        saveLocalStorage('favoriteRecipes', newFavorites);
      }
    } else if (isFavorite) {
      if (favorites) {
        const newFavorites = favorites
          .filter((favorite) => favorite.id !== favoriteObj.id);
        saveLocalStorage('favoriteRecipes', newFavorites);
      } else {
        saveLocalStorage('favoriteRecipes', []);
      }
    }
  };

  return (
    <button
      data-testid="favorite-btn"
      type="button"
      onClick={ handleFavorite }
      src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
    >
      <img
        alt="coraçao"
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  id: PropTypes.string.isRequired,
  foodType: PropTypes.string.isRequired,
  food: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default FavoriteButton;
