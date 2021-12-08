import React from 'react';

export default function Login() {
  return (
    <div className="login-form">
      <form>
        <label htmlFor="email">
          E-mail
          <input
            type="email"
            id="email"
            placeholder="Email"
            data-testid="email-input"
          />
        </label>

        <label htmlFor="password">
          Senha
          <input
            type="password"
            id="password"
            placeholder="Senha"
            data-testid="password-input"
          />
        </label>

        <button type="submit" data-testid="login-submit-btn">Entrar</button>
      </form>
    </div>
  );
}
