import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explore() {
  const { handleRoute } = useContext(AppContext);

  return (
    <div>
      <Header />
      <h1 data-testid="page-title">Explorar</h1>
      <section>
        <button
          type="button"
          value="/explorar/comidas"
          onClick={ ({ target }) => handleRoute(target.value) }
          data-testid="explore-food"
        >
          Explorar Comidas
        </button>
        <button
          type="button"
          value="/explorar/bebidas"
          onClick={ ({ target }) => handleRoute(target.value) }
          data-testid="explore-drinks"
        >
          Explorar Bebidas
        </button>
      </section>
      <Footer />
    </div>
  );
}

export default Explore;
