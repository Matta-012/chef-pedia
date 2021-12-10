import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Meals() {
  const { meals } = useContext(AppContext);
  const alertMessage = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
  return (
    <div>
      <Header />
      <h1 data-testid="page-title">Comidas</h1>
      {!meals && global.alert(alertMessage)}
      <Footer />
    </div>
  );
}

export default Meals;
