import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm';
import { saveLocalStorage } from '../helpers/manageLocalStorage';
import tryberchef from '../images/logo.svg';

const SIX = 6;

export default function Login({ history }) {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(true);

  useEffect(() => {
    const validateLogin = () => {
      const { email, password } = loginInfo;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email) && password.length > SIX;
    };
    const isFormValid = validateLogin();

    setIsSubmitBtnDisabled(!isFormValid);
  }, [loginInfo]);

  const handleLoginChange = ({ target: { value, id } }) => {
    setLoginInfo((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    saveLocalStorage('mealsToken', 1);
    saveLocalStorage('cocktailsToken', 1);
    saveLocalStorage('user', { email: loginInfo.email });

    history.push('/comidas');
  };

  return (
    <div className="login-form bg-login-wave h-screen flex flex-col items-center">
      <div className="bg-wave-pattern bg-cover w-full h-1/3 flex items-center justify-center">
        <div className="w-6/12 sm:w-fit">
          <img className="" src={ tryberchef } alt="Logotipo da chefpedia" />
        </div>
      </div>
      <LoginForm
        loginInfo={ loginInfo }
        handleChange={ handleLoginChange }
        isSubmitBtnDisabled={ isSubmitBtnDisabled }
        handleFormSubmit={ handleFormSubmit }
      />
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
