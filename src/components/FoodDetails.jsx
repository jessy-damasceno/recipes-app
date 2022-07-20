import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import { fetchOneFood } from '../services/fetchFoods';
import DrinkRecommendations from './DrinkRecommendations';
import '../styles/DrinkDetails.css';
import { getDoneRecipes } from '../services/localStorage';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

const FoodDetails = ({ id }) => {
  const isFav = false;
  const history = useHistory();
  const isDone = getDoneRecipes().some(({ id: recipeId }) => recipeId === id);
  const [food, setFood] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchOneFood(id);
      setFood(response);
    };
    fetch();
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

  return (
    <div className="recipe-details-container">
      <img
        className="recipe-details-img"
        data-testid="recipe-photo"
        src={ food.strMealThumb }
        alt={ food.strMeal }
      />
      <div className="recipe-header">
        <h3 data-testid="recipe-title">{food.strMeal}</h3>
        <div className="recipe-header-buttons">
          <button
            data-testid="share-btn"
            type="button"
            onClick={ shareFunction }
          >
            <img src={ shareIcon } alt="share icon" />
          </button>
          <button
            data-testid="favorite-btn"
            type="button"
            // onClick={ () => clipboardCopy(window.location.href) }
          >
            <img src={ isFav ? blackHeart : whiteHeart } alt="favorite icon" />
          </button>
          {isClicked && <span className="copied_span">Link copied!</span>}
        </div>
      </div>
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
      {!isDone && (
        <button
          className="start-recipe-btn"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ handleClick }
        >
          Start Recipe
        </button>
      )}
    </div>
  );
};

FoodDetails.propTypes = {
  id: PropTypes.string.isRequired,
};

export default FoodDetails;
