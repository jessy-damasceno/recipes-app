import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GiHotMeal } from 'react-icons/gi';
import { FaCocktail } from 'react-icons/fa';
import '../styles/Footer.css';

export default function Footer() {
  const { pathname } = useLocation();

  return (
    <footer data-testid="footer">
      <Link
        to="/drinks"
        className={ pathname === '/drinks' ? 'footer-mini-div cl' : 'footer-mini-div' }
      >
        {/* <img
          src={ drinkIcon }
          className="footer-icon"
          alt="Drink"
          data-testid="drinks-bottom-btn"
        /> */}
        <FaCocktail size={ 35 } className="drinks-footer" />
      </Link>
      <Link
        to="/foods"
        className={ pathname === '/foods' ? 'footer-mini-div cl' : 'footer-mini-div' }
      >
        {/* <img
          src={ mealIcon }
          className="footer-icon"
          alt="Meal"
          data-testid="food-bottom-btn"
        /> */}
        <GiHotMeal size={ 35 } className="foods-footer" />
      </Link>
    </footer>
  );
}
