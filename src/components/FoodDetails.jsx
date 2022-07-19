import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchOneFood } from '../services/fetchFoods';
import DrinkRecommendations from './DrinkRecommendations';
import '../styles/DrinkDetails.css';

const FoodDetails = ({ id }) => {
  const [food, setFood] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchOneFood(id);
      setFood(response);
    };
    fetch();
  }, [id]);

  console.log(food);
  const ingredientsList = Object.entries(food).reduce((acc, [key, value]) => {
    if (key.includes('strIngredient') && value) {
      return [...acc, value];
    }
    return acc;
  }, []);

  const measuresList = Object.entries(food).reduce((acc, [key, value]) => {
    if (key.includes('strMeasure') && value) {
      return [...acc, value];
    }
    return acc;
  }, []);

  return (
    <div className="recipe-details-container">
      <img
        className="recipe-details-img"
        data-testid="recipe-photo"
        src={ food.strMealThumb }
        alt={ food.strMeal }
      />
      <h2 data-testid="recipe-title">{food.strMeal}</h2>
      <h3 data-testid="recipe-category">{food.strCategory}</h3>
      <ul>
        {ingredientsList.map((e, i) => (
          <li
            data-testid={ `${i}-ingredient-name-and-measure` }
            key={ e }
          >
            {`${e}: ${measuresList[i]}`}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{food.strInstructions}</p>
      {food.strYoutube
      && <iframe
        data-testid="video"
        width="100%"
        src={ `https://www.youtube.com/embed/${food.strYoutube.split('=')[1]}` }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay;
        clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      /> }
      <DrinkRecommendations />
    </div>
  );
};

FoodDetails.propTypes = {
  id: PropTypes.string.isRequired,
};

export default FoodDetails;
