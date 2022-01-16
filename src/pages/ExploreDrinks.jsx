import React from 'react';
import ExploreOptions from '../components/ExploreOptions';
import Footer from '../components/Footer';
import GoBackTop from '../components/GoBackTop';
import Header from '../components/Header';

export default function ExploreDrinks() {
  return (
    <div className="h-screen">
      <section className="flex justify-between">
        <GoBackTop
          pageName="Explorar Bebidas"
          btnClasses="p-4"
          dataTest="page-title"
        />
        <div className="mr-5 md:mr-0">
          <Header />
        </div>
      </section>
      <ExploreOptions
        ingredientsBtnClasses="bg-drinks-ingredients-bg bg-cover text-slate-100 w-80 sm:w-5/6 h-40 sm:h-80 mt-3 mb-14 font-bold text-lg"
        surpriseMeClasses="bg-drinks-Surprise-bg bg-cover text-slate-100 w-80 sm:w-5/6 h-40 sm:h-80 mt-3 mb-14 font-bold text-lg"
      />
      <Footer />
    </div>
  );
}
