import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';

function Meals() {
  const { meals } = useContext(AppContext);
  const [hasMeals, sethasMeals] = useState(false);
  // const alertMessage = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

  useEffect(() => {
    if (meals.length > 1) {
      sethasMeals(true);
    } else sethasMeals(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meals]);

  if (meals.length > 1) {
    return (
      <div>
        <Header />
        <h1 data-testid="page-title">Comidas</h1>
        <main>
          { hasMeals ? 'Entrou' : 'Carregando'}
        </main>
        {/* {!meals && global.alert(alertMessage)} */}
        <Footer />
      </div>
    );
  }
  return (
    <div>
      <Header />
      <h1 data-testid="page-title">Comidas</h1>
      {/* {!meals && global.alert(alertMessage)} */}
      <Footer />
    </div>
  );
}

export default Meals;

// meals.map((meal) => (
//   <RecipeCard
//     key={ meal.idMeal }
//     image={ meal.strMealThumb }
//     title={ meal.strMeal }
//   />
// ))
