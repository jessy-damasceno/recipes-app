export const KEY_USER = 'user';
export const DONE_RECIPES = 'doneRecipes';
export const FAVORITE_RECIPES = 'favoriteRecipes';
export const IN_PROGRESS_RECIPES = 'inProgressRecipes';

export function getEmail() {
  const response = localStorage.getItem(KEY_USER);

  if (response) {
    return JSON.parse(response).email;
  }
  return 'You don\'t have an email';
}

export const getDoneRecipes = () => {
  const doneRecipes = localStorage.getItem(DONE_RECIPES);

  if (doneRecipes) {
    return JSON.parse(doneRecipes);
  }
  return [];
};

export const addDoneRecipe = (recipe) => {
  const doneRecipes = getDoneRecipes();

  if (doneRecipes.length) {
    localStorage.setItem(DONE_RECIPES, JSON.stringify([...doneRecipes, recipe]));
  } else {
    localStorage.setItem(DONE_RECIPES, JSON.stringify([recipe]));
  }
};

export const getRecipesInProgress = () => {
  const recipesInProgress = localStorage.getItem(IN_PROGRESS_RECIPES);

  if (recipesInProgress) {
    return JSON.parse(recipesInProgress);
  }
  return {
    cocktails: {},
    meals: {},
  };
};

export const getRecipeInProgressByTypeAndId = (type, id) => {
  const recipesInProgress = localStorage.getItem(IN_PROGRESS_RECIPES);

  if (recipesInProgress) {
    return JSON.parse(recipesInProgress)[type][id];
  }
  return [];
};

export const addRecipeInProgress = (type, id, value) => {
  const inProgressRecipes = getRecipesInProgress();
  inProgressRecipes[type][id] = value;

  localStorage.setItem(IN_PROGRESS_RECIPES, JSON.stringify(inProgressRecipes));
};

export const getFavoriteRecipes = () => {
  const response = localStorage.getItem(FAVORITE_RECIPES);

  if (response) {
    return JSON.parse(response);
  }
  return [];
};

export const addFavoriteRecipe = (recipe) => {
  const favoriteRecipes = getFavoriteRecipes();

  if (favoriteRecipes) {
    localStorage.setItem(FAVORITE_RECIPES, JSON.stringify([...favoriteRecipes, recipe]));
  } else {
    localStorage.setItem(FAVORITE_RECIPES, JSON.stringify([recipe]));
  }
};

export const removeFavoriteRecipe = (id) => {
  const favoriteRecipes = getFavoriteRecipes();
  localStorage.setItem(FAVORITE_RECIPES, JSON
    .stringify(favoriteRecipes.filter((e) => e.id !== id)));
};
