import React, { useContext } from 'react';
import Footer from '../components/Footer';
import AppContext from '../context/AppContext';
import Header from '../components/Header';

function RecipeInProgress() {
  const { drinks } = useContext(AppContext);
  const alertMessage = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
  return (
    <div>
      <Header />
      <h1 data-testid="page-title">Bebidas</h1>
      {!drinks && global.alert(alertMessage)}
      <Footer />
    </div>
  );
}

export default RecipeInProgress;
