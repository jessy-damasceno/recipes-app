import React from 'react';
import FavoriteAllRecipes from '../components/FavoriteAllRecipes copy';
// import FavoriteDrinksRecipes from '../components/FavoriteDrinksRecipes';
// import FavoriteFoodRecipes from '../components/FavoriteFoodRecipes copy';
import Header from '../components/Header';

const FavoriteRecipes = () => (
  <main>
    <Header title="Favorite Recipes" />
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
    <FavoriteAllRecipes />
  </main>
);

export default FavoriteRecipes;
