import React from 'react';
// import PropTypes from 'prop-types'; /
import { getFavoriteRecipes } from '../services/localStorage';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
// import whiteHeart from '../images/whiteHeartIcon.svg';

const FavoriteDrinksRecipes = () => {
  const favoriteAll = getFavoriteRecipes();
  return (
    <div>
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      {favoriteAll.map((
        { alcoholicOrNot, name, image, nationality, category, type }, i,
      ) => {
        console.log(type);
        if (type === 'drink') {
          return (
            <div
              key={ i }
            >
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
                { name }
              </h1>
              <button
                type="button"
                // onClick={}
              >
                <img
                  src={ shareIcon }
                  alt="share icon"
                  data-testid={ `${i}-horizontal-share-btn` }
                />
              </button>
              <button
                type="button"
                // onClick={ removeFavoriteFunction }
              >
                <img
                  src={ blackHeart }
                  data-testid={ `${i}-horizontal-favorite-btn` }
                  alt="favorite icon"
                />
              </button>
            </div>
          );
        }
        return (
          <div key={ i }>
            <p
              data-testid={ `${i}-horizontal-top-text` }
            >
              { nationality }
              {' - '}
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
              type="button"
              // onClick={}
            >
              <img
                src={ shareIcon }
                alt="share icon"
                data-testid={ `${i}-horizontal-share-btn` }
              />
            </button>
            <button
              type="button"
              // onClick={}
            >
              <img
                src={ blackHeart }
                data-testid={ `${i}-horizontal-favorite-btn` }
                alt="favorite icon"
              />
            </button>
          </div>
        );
      })}
    </div>
  );
};

// FavoriteDrinksRecipes.propTypes = {
//   // id: PropTypes.string.isRequired,
// };

export default FavoriteDrinksRecipes;
