import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import GoBackTop from './GoBackTop';
import recipesDone from '../images/recipesDone.svg'

function NoneRecipesMade() {
  const { handleRoute } = useContext(AppContext);

  return (
    <div className="h-screen">
      <GoBackTop
          pageName="Receitas Feitas"
          btnClasses="p-4"
          dataTest="page-title"
      />

      <section className="text-center h-5/6"> 
        <div className="flex flex-col justify-evenly items-center h-5/6">
          <div className="px-4">
            <img src={ recipesDone } alt="A closed recipes book."
              className="m-auto"
            />
            <h1 className="font-bold text-2xl text-menu-itens mt-4 mb-2">
              Parece que você ainda não fez nenhuma de nossas receitas :(
            </h1>
            <p className="font-bold text-sm text-menu-itens">
              Ao finalizar uma receita, ela aparecerá aqui.
            </p>
          </div>
          <button
            type="button"
            className="salmon-btn shadow-lg shadow-btn-shadow hover:shadow-menu-itens w-5/6 sm:w-9/12 md:w-5/12 lg:w-4/12"
            onClick={ () => handleRoute('/comidas') }
          >
            Explorar Receitas
          </button>
        </div>
      </section>
    </div>
  );
}

export default NoneRecipesMade;
