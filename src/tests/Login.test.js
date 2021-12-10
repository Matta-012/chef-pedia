import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getLocalStorage } from '../helpers/manageLocalStorage';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import AppProvider from '../context/AppProvider';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const LOGIN_SUBMIT_BTN = 'login-submit-btn';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_EMAIL = 'test@test.com';
const SIX = 6;
const SEVEN = 7;

describe('Realiza os testes da página de Login', () => {
  it('2 - Testa se os elementos de input do formulário são renderizados na tela', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const loginSubmitBtn = screen.getByTestId(LOGIN_SUBMIT_BTN);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginSubmitBtn).toBeInTheDocument();
  });

  it('3 - Testa se o usuário consegue digitar seu email no input de email', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    expect(emailInput).toBeInTheDocument();

    userEvent.type(emailInput, VALID_EMAIL);
    expect(emailInput.value).toBe(VALID_EMAIL);
  });

  it('4 - Testa se o usuário consegue digitar sua senha no input de senha', () => {
    renderWithRouter(<App />);

    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    expect(passwordInput).toBeInTheDocument();

    userEvent.type(passwordInput, '1234567');
    expect(passwordInput.value).toBe('1234567');
  });

  it('5 - Testa se o email é válido e a senha possui mais de 6 caracteres', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const loginSubmitBtn = screen.getByTestId(LOGIN_SUBMIT_BTN);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginSubmitBtn).toBeInTheDocument();

    userEvent.type(emailInput, 'testtest.com');
    expect(emailInput.value).not.toMatch(EMAIL_REGEX);
    expect(loginSubmitBtn.disabled).toBe(true);
    userEvent.type(passwordInput, 'abcdef');
    expect(passwordInput.value).toHaveLength(SIX);
    expect(loginSubmitBtn.disabled).toBe(true);
  });

  it(`5 - Testa se o botão de submit é habilitado
  somente após o formulário ser válido`, () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const loginSubmitBtn = screen.getByTestId(LOGIN_SUBMIT_BTN);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginSubmitBtn).toBeInTheDocument();

    userEvent.type(emailInput, VALID_EMAIL);
    expect(emailInput.value).toMatch(EMAIL_REGEX);
    expect(loginSubmitBtn.disabled).toBe(true);
    userEvent.type(passwordInput, 'abcdefg');
    expect(passwordInput.value).toHaveLength(SEVEN);
    expect(loginSubmitBtn.disabled).toBe(false);
  });

  it(`6 - Testa se as chaves 'mealsToken' e 'cocktailsToken são salvas no
  localStorage após a submissão do formulário de Login' `, async () => {
    renderWithRouter(<AppProvider><App /></AppProvider>);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const loginSubmitBtn = screen.getByTestId(LOGIN_SUBMIT_BTN);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginSubmitBtn).toBeInTheDocument();

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, 'abcdefg');
    expect(loginSubmitBtn.disabled).toBe(false);
    userEvent.click(loginSubmitBtn);

    const mealsToken = await getLocalStorage('mealsToken');
    const cocktailsToken = await getLocalStorage('cocktailsToken');

    expect(mealsToken).toBe(1);
    expect(cocktailsToken).toBe(1);
  });

  it(`7 - Testa se o email do usuário é salvo no localStorage com a 
  chave 'user', no formato 'email: email-da-pessoa',
  após a submissão do formulário de login`, async () => {
    renderWithRouter(<AppProvider><App /></AppProvider>);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const loginSubmitBtn = screen.getByTestId(LOGIN_SUBMIT_BTN);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginSubmitBtn).toBeInTheDocument();

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, 'abcdefg');
    expect(loginSubmitBtn.disabled).toBe(false);
    userEvent.click(loginSubmitBtn);

    const userEmail = await getLocalStorage('user');

    expect(userEmail.email).toBe(VALID_EMAIL);
  });

  it(`8 - Testa se o usuário é redirecionado para a tela
  principal de receitas após a submissão do formulário de login`, () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const loginSubmitBtn = screen.getByTestId(LOGIN_SUBMIT_BTN);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginSubmitBtn).toBeInTheDocument();

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, 'abcdefg');
    expect(loginSubmitBtn.disabled).toBe(false);
    userEvent.click(loginSubmitBtn);

    history.push('/comidas');
    expect(history.location.pathname).toBe('/comidas');
  });
});
