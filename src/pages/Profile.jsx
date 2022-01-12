import React, { useEffect, useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import Footer from '../components/Footer';
import { getLocalStorage } from '../helpers/manageLocalStorage';
import favoriteEmptyIcon from '../images/favoriteEmptyIcon.svg';
import chefIcon from '../images/chefIcon.svg';
import leaveIcon from '../images/leaveIcon.svg';
import avatar from '../images/avatar.png';
import BackButton from '../components/BackButton';
import '../styles/Profile.css';

function Perfil() {
  const [profileEmail, setProfileEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState(avatar);
  const { handleRoute } = useContext(AppContext);

  useEffect(() => {
    const getEmailFromStorage = async () => {
      const userEmail = await getLocalStorage('user');
      setProfileEmail(userEmail.email);
    };
    getEmailFromStorage();
  }, []);

  const handleLogoutBtn = (route) => {
    localStorage.clear();
    handleRoute(route);
  };

  return (
    <div className="profile-wrapper">
      <section className="flex items-center">
        <BackButton
          classes="p-4"
        />
        <span
          className="ml-2 font-bold top-0"
        >
          Perfil
        </span>
      </section>
      <section className="user-info flex flex-col items-center mb-10">
        <img 
          src={ profilePicture }
          alt="Profile picture"
          className="w-28 h-28 rounded-full mt-4"
        />
        <p className="text-gray-500 pt-4">{profileEmail}</p>
      </section>
      <section className=" flex flex-col items-center">
        <button
          type="button"
          value="/receitas-feitas"
          data-testid="profile-done-btn"
          onClick={ ({ target }) => handleRoute(target.value) }
          className="w-7/12 h-11 my-1 text-base bg-login-bg text-recipe-name rounded-2xl font-bold relative"
        >
          <img
            src={ chefIcon } alt="chef-icon"
            className="w-8 h-8 absolute left-2 top-1"
          />
          <span className="ml-4">
            Receitas Feitas
          </span>
        </button>
        <button
          type="button"
          value="/receitas-favoritas"
          data-testid="profile-favorite-btn"
          onClick={ ({ target }) => handleRoute(target.value) }
          className="w-7/12 h-11 my-1 text-base bg-login-bg text-recipe-name rounded-2xl font-bold relative"
        >
          <img 
            src={ favoriteEmptyIcon } alt="favorite empty heart icon"
            className="w-7 h-7 absolute left-2 top-2"
          />
          <span className="ml-4">
            Receitas Favoritas
          </span>
        </button>
        <button
          type="button"
          value="/"
          data-testid="profile-logout-btn"
          onClick={ ({ target }) => handleLogoutBtn(target.value) }
          className="w-7/12 h-11 my-1 text-base bg-login-bg text-recipe-name rounded-2xl font-bold relative"
        >
          <img
            src={ leaveIcon } alt="chef-icon"
            className="w-8 h-8 absolute left-3 top-2"
          />
          <span className="ml-4">
            Sair da conta
          </span>
        </button>
      </section>
      <Footer />
    </div>
  );
}

export default Perfil;
