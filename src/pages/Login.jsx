import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm';
import { saveLocalStorage } from '../helpers/manageLocalStorage';

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
    <div className="login-form">
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
