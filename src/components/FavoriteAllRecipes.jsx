import React, { useState } from 'react';
// import PropTypes from 'prop-types'; /
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { getFavoriteRecipes } from '../services/localStorage';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import '../styles/FavoriteRecipes.css';
// import whiteHeart from '../images/whiteHeartIcon.svg';

const FavoriteDrinksRecipes = () => {
  const favoriteAll = getFavoriteRecipes();
  const [isClicked, setIsClicked] = useState(false);

  const shareFunction = (type, id) => {
    setIsClicked(true);
    clipboardCopy(`${window.location.origin}/${type}s/${id}`);
    setTimeout(() => {
      setIsClicked(false);
    }, +'2000');
  };

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
                onClick={ shareFunction }
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
              {isClicked && <span className="copied_span">Link copied!</span>}
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
              onClick={ () => shareFunction(type, id) }
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
            {isClicked && <span className="copied_span">Link copied!</span>}
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
