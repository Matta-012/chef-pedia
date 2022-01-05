import React, { useEffect, useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getLocalStorage } from '../helpers/manageLocalStorage';

function Perfil() {
  const [profileEmail, setProfileEmail] = useState('');
  const { handleRoute } = useContext(AppContext);

  useEffect(() => {
    const getEmailFromStorage = async () => {
      const userEmail = await getLocalStorage('user');
      console.log(userEmail);
      setProfileEmail(userEmail.email);
    };
    getEmailFromStorage();
  }, []);

  const handleLogoutBtn = (route) => {
    localStorage.clear();
    handleRoute(route);
  };

  return (
    <div>
      <Header />
      <h1 data-testid="page-title">Perfil</h1>
      <section>
        <p data-testid="profile-email">{profileEmail}</p>
        <button
          type="button"
          value="/receitas-feitas"
          data-testid="profile-done-btn"
          onClick={ ({ target }) => handleRoute(target.value) }
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          value="/receitas-favoritas"
          data-testid="profile-favorite-btn"
          onClick={ ({ target }) => handleRoute(target.value) }
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          value="/"
          data-testid="profile-logout-btn"
          onClick={ ({ target }) => handleLogoutBtn(target.value) }
        >
          Sair
        </button>
      </section>
      <Footer />
    </div>
  );
}

export default Perfil;
