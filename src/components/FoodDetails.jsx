import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import { fetchOneFood } from '../services/fetchFoods';
import DrinkRecommendations from './DrinkRecommendations';
import '../styles/FoodDetails.css';
import {
  addFavoriteRecipe,
  getDoneRecipes,
  getFavoriteRecipes,
  getRecipesInProgress,
  removeFavoriteRecipe,
} from '../services/localStorage';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

const FoodDetails = ({ id }) => {
  const history = useHistory();
  const isDone = getDoneRecipes().some(({ id: recipeId }) => recipeId === id);
  const [food, setFood] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchOneFood(id);
      setFood(response);
    };
    fetch();
  }, [id]);

  useEffect(() => {
    const checkProgress = () => {
      const recipesInProgress = getRecipesInProgress();
      if (recipesInProgress.meals[id]) {
        setIsInProgress(true);
      }
    };
    checkProgress();
  }, [id]);

  useEffect(() => {
    const isFavorite = () => {
      const favoritesList = getFavoriteRecipes();
      setIsFav(favoritesList.some((e) => e.id === id));
    };
    isFavorite();
  }, [id]);

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
        type: 'food',
        nationality: food.strArea,
        category: food.strCategory,
        alcoholicOrNot: '',
        name: food.strMeal,
        image: food.strMealThumb,
      };
      addFavoriteRecipe(recipe);
    }
    setIsFav(!isFav);
  };

  return (
    <div className="recipe-f-details-container">
      <img
        className="recipe-f-details-img"
        data-testid="recipe-photo"
        src={ food.strMealThumb }
        alt={ food.strMeal }
      />
      <div className="recipe-f-header">
        <h3 data-testid="recipe-title">{food.strMeal}</h3>
        <div className="recipe-f-header-buttons">
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
      <h3 data-testid="recipe-category">{food.strCategory}</h3>
      <ul>
        {ingredientsList.map((e, i) => (
          <li
            data-testid={ `${i}-ingredient-name-and-measure` }
            key={ i }
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
      {!isDone && (
        <button
          className="start-recipe-btn"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ handleClick }
        >
          {isInProgress ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
    </div>
  );
};

FoodDetails.propTypes = {
  id: PropTypes.string.isRequired,
};

export default FoodDetails;
