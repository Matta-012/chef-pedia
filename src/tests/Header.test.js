// import React from 'react';
// import { screen } from '@testing-library/react';
// // import App from '../App';
// import userEvent from '@testing-library/user-event';
// import Header from '../components/Header';
// import renderWithRouter from './renderWithRouter';

// describe('Testes do componente Header', () => {
//   it('Requisito 9, botões do topo e titulo', () => {
//     const { history } = renderWithRouter(<Header />);

//     expect(history.location.pathname).toBe('/');

//     const profileBtn = screen.getByTestId('profile-top-btn');
//     expect(profileBtn).toBeInTheDocument();

//     const pageTitle = screen.getByTestId('page-title');
//     expect(pageTitle).toBeInTheDocument();

//     const searchBtn = screen.getByTestId('search-top-btn');
//     expect(searchBtn).toBeInTheDocument();
//   });
//   it('Requisito 11', () => {
//     const { history } = renderWithRouter(<Header />);

//     const profileBtn = screen.getByTestId('profile-top-btn');
//     expect(profileBtn).toBeInTheDocument();
//     userEvent.click(profileBtn);

//     expect(history.location.pathname).toBe('/profile');
//   });
// });
