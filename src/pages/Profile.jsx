import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getLocalStorage } from '../helpers/manageLocalStorage';

function Perfil() {
  const [profileEmail, setProfileEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const getEmailFromStorage = () => {
      const userEmail = getLocalStorage('user');
      setProfileEmail(userEmail.email);
    };
    getEmailFromStorage();
  }, []);

  const handleRecipesMadeBtn = () => {
    history.push('/receitas-feitas');
  };

  const handleFavoriteRecipesBtn = () => {
    history.push('/receitas-favoritas');
  };

  const handleLogoutBtn = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header />
      <h1 data-testid="page-title">Perfil</h1>
      <section>
        <p data-testid="profile-email">{profileEmail}</p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ handleRecipesMadeBtn }
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ handleFavoriteRecipesBtn }
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleLogoutBtn }
        >
          Sair
        </button>
      </section>
      <Footer />
    </div>
  );
}

export default Perfil;
