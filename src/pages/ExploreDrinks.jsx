import React from 'react';
import ExploreOptions from '../components/ExploreOptions';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExploreDrinks() {
  return (
    <div>
      <Header />
      <h1 data-testid="page-title">Explorar Bebidas</h1>
      <ExploreOptions />
      <Footer />
    </div>
  );
}
