import React from 'react';

function MealDetails() {
  return (
    <main>
      <img src="#" alt="comida" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">Detalhes da comida</h1>
      <button data-testid="share-btn" type="button">Manda no zap</button>
      <button data-testid="favorite-btn" type="button">Favorite</button>
      <span data-testid="recipe-category"> Catiguria</span>
      <ul>
        <li data-testid="0-ingredient-name-and-measure">
          dale
        </li>
      </ul>
      <p data-testid="instructions"> Instruções </p>
      <video width="320" height="240" controls data-testid="video">
        <source src="#" type="video/mp4" />
        <track kind="captions" />
      </video>
      <span data-testid="0-recomendation-card"> Recomendações </span>
      <button data-testid="start-recipe-btn" type="button">Favorite</button>
    </main>
  );
}

export default MealDetails;
