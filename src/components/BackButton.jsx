import React from 'react'
import { useHistory } from 'react-router-dom';
import backIcon from '../images/backIcon.svg';


function BackButton({ classes }) {
  const history = useHistory();
  return (
    <button
      type="button"
      onClick={() => history.goBack()}
      className={ classes }
    >
      <img src={ backIcon } alt="back icon" />
    </button>
  );
}

export default BackButton;
