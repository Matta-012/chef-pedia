import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchDrinkById } from '../helpers/fetchsFromAPI';

function DrinkDetails() {
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  const [drink, setDrink] = useState({});

  useEffect(() => {
    const getDrink = async () => {
      const fetchedDrink = await fetchDrinkById(id);
      setDrink(fetchedDrink);
    };
    getDrink();
  }, [id]);
  console.log(drink);
  return (
    <main>
      <img src="#" alt="bebida" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">Detalhes da bebida</h1>
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

export default DrinkDetails;
