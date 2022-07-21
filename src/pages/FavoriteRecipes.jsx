import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types'; /
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { getFavoriteRecipes, removeFavoriteRecipe } from '../services/localStorage';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import '../styles/FavoriteRecipes.css';

const FavoriteRecipes = () => {
  const [favorites, setFavorite] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const favoriteRecipes = getFavoriteRecipes();
    setFavorite(favoriteRecipes);
  }, []);

  const shareFunction = (type, id) => {
    setIsClicked(true);
    clipboardCopy(`${window.location.origin}/${type}s/${id}`);
    setTimeout(() => {
      setIsClicked(false);
    }, +'2000');
  };

  const handleClick = (type) => {
    const newFavorites = getFavoriteRecipes();
    setFavorite(newFavorites.filter((favorite) => favorite.type === type));
  };

  const removeFavorite = (id) => {
    setFavorite((prev) => prev.filter((fav) => fav.id !== id));
    removeFavoriteRecipe(id);
  };

  return (
    <div>
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFavorite(getFavoriteRecipes()) }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => handleClick('food') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleClick('drink') }
        >
          Drinks
        </button>
      </div>
      {Boolean(favorites?.length) && favorites.map((e, index) => (
        <div
          className="favorite-recipes-container"
          key={ index }
        >
          <Link to={ `/${e.type}s/${e.id}` }>
            <h4
              data-testid={ `${index}-horizontal-top-text` }
            >
              {e.type === 'food'
                ? `${e.nationality} - ${e.category}`
                : e.alcoholicOrNot}
            </h4>
            <img
              src={ e.image }
              data-testid={ `${index}-horizontal-image` }
              className="favorite-recipe-image"
              alt=""
            />
            <h2
              data-testid={ `${index}-horizontal-name` }
            >
              { e.name }
            </h2>
          </Link>
          <button
            type="button"
            onClick={ () => shareFunction(e.type, e.id) }
          >
            <img
              src={ shareIcon }
              alt="share icon"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          <button
            type="button"
            onClick={ () => removeFavorite(e.id) }
          >
            <img
              src={ blackHeart }
              data-testid={ `${index}-horizontal-favorite-btn` }
              alt="favorite icon"
            />
          </button>
          {isClicked && <span className="copied_span">Link copied!</span>}
        </div>
      ))}
    </div>
  );
};

// FavoriteRecipes.propTypes = {
//   // id: PropTypes.string.isRequired,
// };

export default FavoriteRecipes;
