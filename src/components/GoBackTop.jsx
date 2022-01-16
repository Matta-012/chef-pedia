import React from 'react'
import BackButton from '../components/BackButton';

function GoBackTop({ pageName, btnClasses, dataTest }) {
  return ( 
    <section className="flex items-center">
      <BackButton classes={ btnClasses } />
      <span
        className="ml-2 font-bold top-0"
        data-testid={ dataTest }
      >
        { pageName }
      </span>
    </section>
  );
}

export default GoBackTop;
