import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

import '../styles/footer.css';

export default function Footer() {
  return (
    <footer data-testid="footer">
      <nav className="footer-links">
        <Link data-testid="food-bottom-btn" to="/comidas">
          <div>
            <img src={ mealIcon } alt="Icone Comidas" />
          </div>
        </Link>

        <Link data-testid="drinks-bottom-btn" to="/bebidas">
          <div>
            <img src={ drinkIcon } alt="Icone Bebidas" />
          </div>
        </Link>

        <Link data-testid="explore-bottom-btn" to="/explorar">
          <div>
            <img src={ exploreIcon } alt="Icone Comidas" />
          </div>
        </Link>
      </nav>
    </footer>
  );
}
