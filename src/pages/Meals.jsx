import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function Meals({ history }) {
  return (
    <div>
      <Header history={ history } />
      <h1 data-testid="page-title">Comidas</h1>
    </div>
  );
}

Meals.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isrequired;

export default Meals;
