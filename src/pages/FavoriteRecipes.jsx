import React from 'react';
import FavoriteAllRecipes from '../components/FavoriteAllRecipes';
// import FavoriteDrinksRecipes from '../components/FavoriteDrinksRecipes';
// import FavoriteFoodRecipes from '../components/FavoriteFoodRecipes copy';
import Header from '../components/Header';

const FavoriteRecipes = () => (
  <main>
    <Header title="Favorite Recipes" />
    <FavoriteAllRecipes />
  </main>
);

export default FavoriteRecipes;
