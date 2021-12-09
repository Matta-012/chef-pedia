import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Meals({ history }) {
  return (
    <div>
      <Header history={ history } />
      <h1 data-testid="page-title">Comidas</h1>
      <Footer />
    </div>
  );
}

Meals.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Meals;
