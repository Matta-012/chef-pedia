import React from 'react';
import { useHistory } from 'react-router-dom';
import octopusImg from '../images/notFound.svg';

function PageNotFound() {
  const history = useHistory();

  return (
    <div className="custom-h-screen flex flex-col justify-evenly items-center">
      <h1 className="text-center font-palanquin font-bold text-2xl text-titles-text">Erro 404</h1>
      <div>
        <img src={ octopusImg } alt="" />
      </div>
      <h1 className="text-center font-palanquin font-bold text-2xl text-not-found-text">Oops! Algo deu errado...</h1>
      <p className="text-justify px-8 -mt-5">
        Parece que tivemos um problema durante o carregamento. Volte para a página inicial e tente novamente.
      </p>
      <button
        type="submit"
        data-testid="back-btn"
        className="salmon-btn shadow-lg shadow-btn-shadow hover:shadow-menu-itens "
        onClick={ () => history.goBack() }
      >
        Voltar
      </button>
    </div>
  );
}

export default PageNotFound;
