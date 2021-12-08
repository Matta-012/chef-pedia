import PropTypes from 'prop-types';
import React from 'react';

function Header({ history }) {
  const redirectToProfile = () => {
    history.push('/profile');
  };
  return (
    <header>
      <h1 data-testid="page-title">Header</h1>
      <button
        data-testid="profile-top-btn"
        type="button"
        onClick={ redirectToProfile }
      >
        Perfil
      </button>
      <button
        data-testid="search-top-btn"
        type="button"
      >
        Pesquisar
      </button>
    </header>
  );
}

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isrequired;

export default Header;
