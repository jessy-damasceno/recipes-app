import React from 'react';
import { getFavoriteRecipes } from '../services/localStorage';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
// import whiteHeart from '../images/whiteHeartIcon.svg';
// import PropTypes from 'prop-types';

const FavoriteDrinksRecipes = () => {
  const favoriteAll = getFavoriteRecipes();

  return (
    <div>
      <h1>Drinks</h1>
      {favoriteAll.map((
        { alcoholicOrNot, name, image, nationality, category, type }, i,
      ) => {
        if (favoriteAll.type === 'drink') {
          <div key={ type }>
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
              // onClick={ favoriteFunction }
            >
              <img
                src={ blackHeart }
                alt="favorite icon"
              />
            </button>
          </div>;
        } else {
          return (
            <div key={ type }>
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
              // onClick={ favoriteFunction }
              >
                <img
                  src={ blackHeart }
                  alt="favorite icon"
                />
              </button>
            </div>
          );
        }
      })}
    </div>
  );
};

// FavoriteDrinksRecipes.propTypes = {};

export default FavoriteDrinksRecipes;
