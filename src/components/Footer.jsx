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
        <Link to="/comidas">
          <div>
            <img src={ mealIcon } alt="Icone Comidas" data-testid="food-bottom-btn" />
          </div>
        </Link>

        <Link to="/bebidas">
          <div>
            <img src={ drinkIcon } alt="Icone Bebidas" data-testid="drinks-bottom-btn" />
          </div>
        </Link>

        <Link to="/explorar">
          <div>
            <img
              src={ exploreIcon }
              alt="Icone Explorar"
              data-testid="explore-bottom-btn"
            />
          </div>
        </Link>
      </nav>
    </footer>
  );
}
