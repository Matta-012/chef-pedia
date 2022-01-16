import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import GoBackTop from '../components/GoBackTop';

function Explore() {
  const { handleRoute } = useContext(AppContext);

  return (
    <div className="h-screen">
      <section className="flex justify-between">
        <GoBackTop
          pageName="Explorar"
          btnClasses="p-4"
          dataTest="page-title"
        />
        <div className="mr-5 md:mr-0">
          <Header />
        </div>
      </section>

      <section className="h-5/6 flex flex-col items-center">
        <button
          type="button"
          onClick={ () => handleRoute('/explorar/comidas') }
          data-testid="explore-food"
          className="bg-meals-bg bg-cover text-slate-100 w-80 sm:w-5/6 h-40 sm:h-80 mt-3 mb-14 font-bold text-lg"
        >
          Explorar Comidas
        </button>
        <button
          type="button"
          onClick={ () => handleRoute('/explorar/bebidas') }
          data-testid="explore-drinks"
          className="bg-drinks-bg bg-cover text-slate-100 w-80 sm:w-5/6 h-40 sm:h-80 font-bold text-lg"
        >
          Explorar Bebidas
        </button>
      </section>
      <Footer />
    </div>
  );
}

export default Explore;
