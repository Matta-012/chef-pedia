import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';

function Meals() {
  const { meals, firstTime } = useContext(AppContext);
  const alertMessage = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

  return (
    <div>
      <Header />
      <h1 data-testid="page-title">Comidas</h1>
      {!meals && global.alert(alertMessage)}
      {meals.map((meal, index) => (
        <RecipeCard
          key={ meal.idMeal }
          image={ meal.strMealThumb }
          title={ meal.strMeal }
          index={ index }
        />
      ))}
      {meals.length === 0 && !firstTime && global.alert(alertMessage)}
      {meals.length === 1 && <Redirect to={ `/comidas/${meals[0].idMeal}` } />}
      <Footer />
    </div>
  );
}

export default Meals;
