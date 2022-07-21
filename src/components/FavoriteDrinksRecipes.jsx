import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getFavoriteRecipes } from '../services/localStorage';
import { fetchOneDrink } from '../services/fetchDrinks';
import shareIcon from '../images/shareIcon.svg';
// import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

const FavoriteDrinksRecipes = () => {
  const favoriteAll = getFavoriteRecipes();

  return (
    <div>
      <h1>Drinks</h1>
      {favoriteAll.map(({ alcoholicOrNot, name, image }, i) => (
        // if (isDrink) {
        <div key={ i }>
          <p
            data-testid={ `${i}-horizontal-top-text` }
          >
            { alcoholicOrNot }
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
              src={ blackHeart }
              alt="favorite icon"
            />
          </button>
        </div>
        // }
        // return '';
      ))}
    </div>
  );
};

FavoriteDrinksRecipes.propTypes = {
  id: PropTypes.string.isRequired,
};

export default FavoriteDrinksRecipes;
