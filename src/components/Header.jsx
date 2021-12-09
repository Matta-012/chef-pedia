import PropTypes from 'prop-types';
import React, { useState } from 'react';
import HeaderRadioSearch from './HeaderRadioSearch';

function Header({ history }) {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchInput, setSearchInput] = useState('');
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
          <div>
            <label htmlFor="search-input">
              <input
                type="text"
                id="search-input"
                placeholder="Pesquisar"
                data-testid="search-input"
                onChange={ (e) => setSearchInput(e.target.value) }
              />
            </label>
          </div>
        )
      }
      <HeaderRadioSearch
        searchInputValue={ searchInput }
        history={ history }
      />
    </header>
  );
}

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isrequired;

export default Header;
