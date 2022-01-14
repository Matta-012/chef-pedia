import React from 'react'
import BackButton from '../components/BackButton';

function GoBackTop({ pageName, btnClasses }) {
  return ( 
    <section className="flex items-center">
      <BackButton
        classes={ btnClasses }
      />
      <span
        className="ml-2 font-bold top-0"
      >
        { pageName }
      </span>
    </section>
  );
}

export default GoBackTop;
