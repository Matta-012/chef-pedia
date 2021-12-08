import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testes da tela de login', () => {
  test('Requisito 2', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');
  });
});
