import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import Header from '../components/Header';

function Meals({ history }) {
  const { meals } = useContext(AppContext);
  const alertMessage = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
  return (
    <div>
      <Header history={ history } />
      <h1 data-testid="page-title">Comidas</h1>
      {!meals && global.alert(alertMessage)}
    </div>
  );
}
Meals.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isrequired;
export default Meals;
