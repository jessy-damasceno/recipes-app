import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import { fetchOneFood } from '../services/fetchFoods';
import '../styles/FoodDetails.css';
import {
  addDoneRecipe,
  addFavoriteRecipe,
  addRecipeInProgress,
  getFavoriteRecipes,
  getRecipeInProgressByTypeAndId,
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

    const isFavorite = () => {
      const favoritesList = getFavoriteRecipes();
      setIsFav(favoritesList.some((e) => e.id === id));
    };

    const initialCheck = () => {
      const response = getRecipeInProgressByTypeAndId('meals', id) || [];
      response.forEach((e) => setIsChecked((oldState) => ({ ...oldState, [e]: true })));
    };

    fetch();
    isFavorite();
    initialCheck();

    return () => {
      setIsChecked({});
    };
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
    const date = new Date();
    const recipe = {
      id,
      type: 'food',
      nationality: food.strArea,
      category: food.strCategory,
      alcoholicOrNot: '',
      name: food.strMeal,
      image: food.strMealThumb,
      doneDate: date.toLocaleDateString(),
      tags: food.strTags.split(','),
    };
    addDoneRecipe(recipe);
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

  const verifyCheck = () => {
    const keyValues = Object.values(isChecked);
    return keyValues.every((e) => e === true)
      && (keyValues.length === ingredientsList.length);
  };

  const handleChange = ({ target: { name, checked } }) => {
    const newIsChecked = { ...isChecked, [name]: checked };
    addRecipeInProgress('meals', id, Object.entries(newIsChecked)
      .filter((entry) => entry[1] === true).map(([key]) => key));
    setIsChecked(newIsChecked);
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
            className={ isChecked[i + e] ? 'ingredient-checked' : 'recipe-f-ingredient' }
          >
            <label htmlFor={ i + e }>
              <input
                type="checkbox"
                name={ i + e }
                id={ i + e }
                onChange={ handleChange }
                checked={ isChecked[i + e] ?? false }
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
        disabled={ !verifyCheck() }
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
