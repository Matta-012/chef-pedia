import PropTypes from 'prop-types';
import React, { useState } from 'react';

function Header({ history }) {
  const [showSearchInput, setShowSearchInput] = useState(false);
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
        onClick={ () => setShowSearchInput(!showSearchInput) }
      >
        Pesquisar
      </button>
      {
        showSearchInput && (
          <label htmlFor="search-input">
            <input
              type="text"
              id="search-input"
              placeholder="Pesquisar"
              data-testid="search-input"
            />
          </label>
        )
      }
    </header>
  );
}

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isrequired;

export default Header;
