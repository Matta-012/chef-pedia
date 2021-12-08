import React, { useEffect, useState } from 'react';
import LoginForm from '../components/LoginForm';

const SIX = 6;

export default function Login() {
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

  return (
    <div className="login-form">
      <LoginForm
        loginInfo={ loginInfo }
        handleChange={ handleLoginChange }
        isSubmitBtnDisabled={ isSubmitBtnDisabled }
      />
    </div>
  );
}
