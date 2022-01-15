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
      <div className="mx-auto mt-4 w-11/12 flex justify-between hover:cursor-pointer">
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

        <Link to="/perfil">
          <div>
            <img
              src={ profileIcon }
              alt="Ícone de perfil"
              data-testid="profile-top-btn"
            />
          </div>
        </Link>
      </div>

      {showSearchInput && (
          <div className="mx-auto w-10/12 mt-4">
            <label htmlFor="search-input">
              <input
                type="text"
                id="search-input"
                placeholder="Pesquisar"
                data-testid="search-input"
                onChange={ (e) => setSearchInput(e.target.value) }
                className="w-full p-2 border border-login-bg rounded-lg focus:outline-none focus:ring focus:ring-light-login-bg"
              />
            </label>
            <HeaderRadioSearch searchInputValue={ searchInput } />
          </div>
        )}

    </header>
  );
}

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isrequired;

export default Header;
