import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchOneDrink } from '../services/fetchDrinks';
import FoodRecommendations from './FoodRecommendations';
import '../styles/DrinkDetails.css';

const DrinkDetails = ({ id }) => {
  const [drink, setDrink] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchOneDrink(id);
      setDrink(response);
    };
    fetch();
  }, [id]);

  console.log(drink);
  const ingredientsList = Object.entries(drink).reduce((acc, [key, value]) => {
    if (key.includes('strIngredient') && value) {
      return [...acc, value];
    }
    return acc;
  }, []);

  const measuresList = Object.entries(drink).reduce((acc, [key, value]) => {
    if (key.includes('strMeasure') && value) {
      return [...acc, value];
    }
    return acc;
  }, []);

  return (
    <div className="recipe-details-container">
      <div className="recipe-details-img">
        <img
          data-testid="recipe-photo"
          src={ drink.strDrinkThumb }
          alt={ drink.strDrink }
        />
      </div>
      <h2 data-testid="recipe-title">{drink.strDrink}</h2>
      <h3 data-testid="recipe-category">{drink.strAlcoholic}</h3>
      <ul>
        {ingredientsList.map((e, i) => (
          <li
            data-testid={ `${i}-ingredient-name-and-measure` }
            key={ e }
          >
            {`${e} ${measuresList[i] ? `: ${measuresList[i]}` : ''}`}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{drink.strInstructions}</p>
      <FoodRecommendations />
    </div>
  );
};

DrinkDetails.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DrinkDetails;
