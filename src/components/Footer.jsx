import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import mealIconSelected from '../images/mealIconSelected.svg';
import drinkIcon from '../images/drinkIcon.svg';
import drinkIconSelected from '../images/drinkIconSelected.svg';
import exploreIcon from '../images/exploreIcon.svg';
import exploreIconSelected from '../images/exploreIconSelected.svg';  

export default function Footer() {
  const {pathname} = useLocation();

  return (
    <footer
      data-testid="footer"
      className="fixed bottom-0 w-full"
    >
      <nav className="flex justify-around bg-white py-2 border border-t-gray-300 rounded-t-lg">
        <Link to="/comidas">
          <div>
            {pathname === '/comidas'
              ? (
                <img
                  src={ mealIconSelected }
                  alt="Ícone Comidas"
                  data-testid="food-bottom-btn"
                />
              ) : (
                <img
                  src={ mealIcon }
                  alt="Ícone Comidas"
                  data-testid="food-bottom-btn"
                />
              )}
          </div>
        </Link>

        <Link to="/bebidas">
          <div>
            {pathname === '/bebidas'
                ? (
                  <img
                    src={ drinkIconSelected }
                    alt="Ícone Bebidas"
                    data-testid="drink-bottom-btn"
                  />
                ) : (
                  <img
                    src={ drinkIcon }
                    alt="Ícone Bebidas"
                    data-testid="drink-bottom-btn"
                  />
                )}
          </div>
        </Link>

        <Link to="/explorar">
          <div>
            {pathname === '/explorar'
                ? (
                  <img
                    src={ exploreIconSelected }
                    alt="Ícone Explorar"
                    data-testid="explore-bottom-btn"
                  />
                ) : (
                  <img
                    src={ exploreIcon }
                    alt="Ícone Explorar"
                    data-testid="explore-bottom-btn"
                  />
                )}
          </div>
        </Link>
      </nav>
    </footer>
  );
}
