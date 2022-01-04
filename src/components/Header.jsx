import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HeaderRadioSearch from './HeaderRadioSearch';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [shouldDisplaySearchIcon, setShouldDisplaySearchIcon] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === '/comidas'
      || location.pathname === '/bebidas'
      || location.pathname === '/explorar/comidas/area'
    ) {
      setShouldDisplaySearchIcon(true);
    } else {
      setShouldDisplaySearchIcon(false);
    }
  }, [location.pathname]);

  return (
    <header>
      <h1 data-testid="page-title">Header</h1>
      <Link to="/perfil">
        <div>
          <img
            src={ profileIcon }
            alt="Ícone de perfil"
            data-testid="profile-top-btn"
          />
        </div>
      </Link>
      {shouldDisplaySearchIcon && (
        <div>
          <img
            src={ searchIcon }
            alt="Ícone de pesquisa"
            data-testid="search-top-btn"
            onClick={ () => setShowSearchInput(!showSearchInput) }
            aria-hidden="true"
          />
        </div>
      )}
      {showSearchInput && (
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
      )}
      <HeaderRadioSearch searchInputValue={ searchInput } />
    </header>
  );
}

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isrequired;

export default Header;
