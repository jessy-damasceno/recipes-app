import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/drinks">
        <img
          src={ drinkIcon }
          className="footer-icon"
          alt="Drink"
          data-testid="drinks-bottom-btn"
        />
      </Link>

      <div>
        <img src={ exploreIcon } alt="Explore" className="footer-icon" />
      </div>

      <Link to="/foods">
        <img
          src={ mealIcon }
          className="footer-icon"
          alt="Meal"
          data-testid="food-bottom-btn"
        />
      </Link>
    </footer>
  );
}
