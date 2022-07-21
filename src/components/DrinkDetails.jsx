import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import { fetchOneDrink } from '../services/fetchDrinks';
import FoodRecommendations from './FoodRecommendations';
import '../styles/DrinkDetails.css';
import {
  addFavoriteRecipe,
  getDoneRecipes,
  getFavoriteRecipes,
  removeFavoriteRecipe,
  verifyMealIsInProgress,
} from '../services/localStorage';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

const DrinkDetails = ({ id }) => {
  const history = useHistory();
  const isDone = getDoneRecipes().some(({ id: recipeId }) => recipeId === id);
  const [drink, setDrink] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchOneDrink(id);
      setDrink(response);
    };
    fetch();
  }, [id]);

  useEffect(() => {
    const isFavorite = () => {
      const favoritesList = getFavoriteRecipes();
      setIsFav(favoritesList.some((e) => e.id === id));
    };
    isFavorite();
  }, [id]);

  useEffect(() => {
    const checkProgress = () => {
      const response = verifyMealIsInProgress(id);
      setIsInProgress(response);
    };
    checkProgress();
  });

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

  const handleClick = () => {
    history.push(`${id}/in-progress`);
  };

  const shareFunction = () => {
    setIsClicked(true);
    clipboardCopy(window.location.href);
    setTimeout(() => {
      setIsClicked(false);
    }, +'2000');
  };

  const favoriteFunction = () => {
    if (isFav) {
      removeFavoriteRecipe(id);
    } else {
      const recipe = {
        id,
        type: 'drink',
        nationality: '',
        category: drink.strCategory,
        alcoholicOrNot: drink.strAlcoholic,
        name: drink.strDrink,
        image: drink.strDrinkThumb,
      };
      localStorage.setItem('type', JSON.stringify({ type: 'drink' }));
      addFavoriteRecipe(recipe);
    }
    setIsFav(!isFav);
  };

  return (
    <div className="recipe-details-container">
      <div className="recipe-details-img">
        <img
          data-testid="recipe-photo"
          src={ drink.strDrinkThumb }
          alt={ drink.strDrink }
        />
      </div>
      <div className="recipe-header">
        <h3 data-testid="recipe-title">{drink.strDrink}</h3>
        <div className="recipe-header-buttons">
          <button
            data-testid="share-btn"
            type="button"
            onClick={ shareFunction }
          >
            <img src={ shareIcon } alt="share icon" />
          </button>
          <button
            type="button"
            onClick={ favoriteFunction }
          >
            <img
              data-testid="favorite-btn"
              src={ isFav ? blackHeart : whiteHeart }
              alt="favorite icon"
            />
          </button>
          {isClicked && <span className="copied_span">Link copied!</span>}
        </div>
      </div>
      <h3 data-testid="recipe-category">{drink.strAlcoholic}</h3>
      <ul>
        {ingredientsList.map((e, i) => (
          <li
            data-testid={ `${i}-ingredient-name-and-measure` }
            key={ i }
          >
            {`${e} ${measuresList[i] ? `: ${measuresList[i]}` : ''}`}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{drink.strInstructions}</p>
      <FoodRecommendations />
      {!isDone && (
        <button
          className="start-recipe-btn"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ handleClick }
        >
          {isInProgress ? 'Continue Recipe' : 'Start Recipe'}
        </button>)}
    </div>
  );
};

DrinkDetails.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DrinkDetails;
