import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { drinkContext } from '../context/context';
import '../styles/FoodRecommendations.css';

function DrinkRecommendations() {
  const { drinksData } = useContext(drinkContext);

  // console.log(drinksData);

  return (
    <div className="food-recommendations-container">
      {drinksData.map((drink, i) => i < +'6' && (
        <Link
          key={ i }
          data-testid={ `${i}-recomendation-card` }
          to={ `/drinks/${drink.idDrink}` }
        >
          <p
            data-testid={ `${i}-recomendation-title` }
            className="food-name"
          >
            {drink.strDrink}
          </p>
          <img
            src={ drink.strDrinkThumb }
            alt="Dish icon"
            data-testid={ `${i}-card-img` }
            className="food-image"
          />
        </Link>
      ))}
    </div>
  );
}

export default DrinkRecommendations;
