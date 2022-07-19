import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { foodContext } from '../context/context';
import '../styles/FoodRecommendations.css';

function FoodRecommendations() {
  const { foodData } = useContext(foodContext);

  return (
    <div className="food-recommendations-container">
      {foodData.map((food, i) => i < +'6' && (
        <Link
          key={ i }
          data-testid={ `${i}-recomendation-card` }
          to={ `/foods/${food.idMeal}` }
        >
          <p
            data-testid={ `${i}-recomendation-title` }
            className="food-name"
          >
            {food.strMeal}
          </p>
          <img
            src={ food.strMealThumb }
            alt="Dish icon"
            data-testid={ `${i}-card-img` }
            className="food-image"
          />
        </Link>
      ))}
    </div>
  );
}

export default FoodRecommendations;
