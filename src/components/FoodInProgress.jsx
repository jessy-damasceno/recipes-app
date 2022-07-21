import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import { fetchOneFood } from '../services/fetchFoods';
import '../styles/FoodDetails.css';
import {
  addFavoriteRecipe,
  getFavoriteRecipes,
  removeFavoriteRecipe,
} from '../services/localStorage';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

const FoodInProgress = ({ id }) => {
  const history = useHistory();
  const [food, setFood] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [isChecked, setIsChecked] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchOneFood(id);
      setFood(response);
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
    history.push('/done-recipes');
  };

  const shareFunction = () => {
    setIsClicked(true);
    clipboardCopy(window.location.href.replace('/in-progress', ''));
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

  const handleChange = ({ target: { name, checked } }) => {
    setIsChecked({
      ...isChecked,
      [name]: checked,
    });
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
            data-testid={ `${i}-ingredient-step` }
            key={ i }
            className={ isChecked[e] ? 'ingredient-checked' : 'recipe-f-ingredient' }
          >
            <label htmlFor={ e }>
              <input
                type="checkbox"
                name={ e }
                id={ e }
                onChange={ handleChange }
              />
              {`${e}: ${measuresList[i]}`}
            </label>
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{food.strInstructions}</p>
      <button
        className="start-recipe-btn"
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ handleClick }
      >
        Finish Recipe
      </button>
    </div>
  );
};

FoodInProgress.propTypes = {
  id: PropTypes.string.isRequired,
};

export default FoodInProgress;
