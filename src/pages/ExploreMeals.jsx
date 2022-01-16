import React from 'react';
import ExploreOptions from '../components/ExploreOptions';
import Footer from '../components/Footer';
import GoBackTop from '../components/GoBackTop';
import Header from '../components/Header';

export default function ExploreMeals() {
  return (
    <div className="h-screen">
      <section className="flex justify-between">
        <GoBackTop
          pageName="Explorar Comidas"
          btnClasses="p-4"
          dataTest="page-title"
        />
        <div className="mr-5 md:mr-0">
          <Header />
        </div>
      </section>
      <ExploreOptions
        ingredientsBtnClasses="bg-meals-ingredients-bg bg-cover text-slate-100 w-80 sm:w-5/6 h-40 sm:h-80 mt-3 mb-3 font-bold text-lg"
        areaBtnClasses="bg-meals-area-bg bg-cover text-slate-100 w-80 sm:w-5/6 h-40 sm:h-80 mt-3 mb-3 font-bold text-lg"
        surpriseMeClasses="bg-meals-Surprise-bg bg-cover text-slate-100 w-80 sm:w-5/6 h-40 sm:h-80 mt-3 font-bold text-lg"
      />
      <Footer />
    </div>
  );
}
