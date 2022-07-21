import React from 'react';
import { getFavoriteRecipes } from '../services/localStorage';
// import PropTypes from 'prop-types';

const FavoriteAllRecipes = () => {
  const favoriteAll = getFavoriteRecipes();
  return (
    <div>
      <h1>All</h1>
      {favoriteAll.map(({ id, type, name, image }, i) => (
        <div key={ id }>
          <p
            data-testid={ `${i}-horizontal-top-text` }
          >
            { type }
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
        </div>
      ))}
    </div>
  );
};

// FavoriteAllRecipes.propTypes = {};

export default FavoriteAllRecipes;
