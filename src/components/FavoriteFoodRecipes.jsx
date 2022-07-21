import React from 'react';
import PropTypes from 'prop-types';
import { getFavoriteRecipes } from '../services/localStorage';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

const FavoriteFoodRecipes = () => {
  const favoriteAll = getFavoriteRecipes();

  return (
    <div>
      <h1>Foods</h1>
      {favoriteAll.map(({ category, name, image, nationality }, i) => (
        <div key={ i }>
          <p
            data-testid={ `${i}-horizontal-top-text` }
          >
            { nationality }
            {' '}
            -
            {' '}
            { category }
          </p>
          <img
            src={ image }
            data-testid={ `${i}-horizontal-image` }
            alt=""
          />
          <h1
            data-testid={ `${i}-horizontal-name` }
          >
            {name}
          </h1>
          <button
            data-testid={ `${i}-horizontal-share-btn` }
            type="button"
            // onClick={ shareFunction }
          >
            <img src={ shareIcon } alt="share icon" />
          </button>
          <button
            type="button"
            data-testid={ `${i}-horizontal-favorite-btn` }
            onClick={ favoriteFunction }
          >
            <img
              src={ isFav ? blackHeart : whiteHeart }
              alt="favorite icon"
            />
          </button>
        </div>
      ))}
    </div>
  );
};

FavoriteFoodRecipes.propTypes = {
  id: PropTypes.string.isRequired,
};

export default FavoriteFoodRecipes;
