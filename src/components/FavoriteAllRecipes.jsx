import React from 'react';
// import PropTypes from 'prop-types'; /
import { Link } from 'react-router-dom';
import { getFavoriteRecipes } from '../services/localStorage';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import '../styles/FavoriteRecipes.css';
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
        { alcoholicOrNot, name, image, nationality, category, type, id }, i,
      ) => {
        console.log(type);
        if (type === 'drink') {
          return (
            <div
              className="favorite-recipes-container"
              key={ i }
            >
              <p
                data-testid={ `${i}-horizontal-top-text` }
              >
                { alcoholicOrNot }
              </p>
              <Link to={ `/drinks/${id}` }>
                <img
                  src={ image }
                  data-testid={ `${i}-horizontal-image` }
                  className="favorite-recipe-image"
                  alt=""
                />
                <h1
                  data-testid={ `${i}-horizontal-name` }
                >
                  { name }
                </h1>
              </Link>
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
          <div
            className="favorite-recipes-container"
            key={ i }
          >
            <p
              data-testid={ `${i}-horizontal-top-text` }
            >
              { nationality }
              {' - '}
              { category }
            </p>
            <Link to={ `/foods/${id}` }>
              <img
                src={ image }
                data-testid={ `${i}-horizontal-image` }
                className="favorite-recipe-image"
                alt=""
              />
              <h1
                data-testid={ `${i}-horizontal-name` }
              >
                {name}
              </h1>
            </Link>
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
