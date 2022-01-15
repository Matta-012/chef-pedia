import React from "react";
import PropTypes from "prop-types";

function LoginForm({
  loginInfo: { email, password },
  handleChange,
  isSubmitBtnDisabled,
  handleFormSubmit,
}) {
  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col w-10/12 items-center"
    >
      <div className="w-10/12 mt-14">
        <p className="self-start text-2xl mb-4">Login</p>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleChange}
          required
          placeholder="Email"
          data-testid="email-input"
          className="w-full p-2 border border-login-bg rounded-lg focus:outline-none focus:ring focus:ring-light-login-bg"
        />
      </div>

      <div className="w-10/12 mt-9 mb-10">
        <input
          type="password"
          id="password"
          value={password}
          onChange={handleChange}
          required
          placeholder="Senha"
          data-testid="password-input"
          className="w-full p-2 border border-login-bg rounded-lg focus:outline-none focus:ring focus:ring-light-login-bg"
        />
      </div>

      <button
        disabled={isSubmitBtnDisabled}
        type="submit"
        data-testid="login-submit-btn"
        className="w-40 h-11 my-1 text-base bg-login-bg text-recipe-name rounded-2xl font-bold self-center card-shadow disabled:opacity-40 active:translate-y-1 transition duration-100"
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
