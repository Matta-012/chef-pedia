import React from 'react';
import PropTypes from 'prop-types';

function LoginForm({
  loginInfo: { email, password },
  handleChange,
  isSubmitBtnDisabled,
  handleFormSubmit,
}) {
  return (
    <form onSubmit={ handleFormSubmit }>
      <label htmlFor="email">
        E-mail
        <input
          type="email"
          id="email"
          value={ email }
          onChange={ handleChange }
          required
          placeholder="Email"
          data-testid="email-input"
        />
      </label>

      <label htmlFor="password">
        Senha
        <input
          type="password"
          id="password"
          value={ password }
          onChange={ handleChange }
          required
          placeholder="Senha"
          data-testid="password-input"
        />
      </label>

      <button
        disabled={ isSubmitBtnDisabled }
        type="submit"
        data-testid="login-submit-btn"
      >
        Entrar
      </button>
    </form>
  );
}

LoginForm.propTypes = {
  loginInfo: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  isSubmitBtnDisabled: PropTypes.bool.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
