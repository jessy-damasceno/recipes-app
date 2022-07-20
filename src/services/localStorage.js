export const KEY_USER = 'user';
export const DONE_RECIPES = 'doneRecipes';
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

export const verifyMealIsInProgress = (id) => {
  const inProgressRecipes = getRecipesInProgress();

  if (Object.keys(inProgressRecipes.meals).length > 1) {
    return Object.keys(JSON.parse(inProgressRecipes.meals)).includes(id);
  }
  return false;
};

export const addMealInProgress = (key, value) => {
  const inProgressRecipes = getRecipesInProgress();
  inProgressRecipes.meals[key] = value;

  localStorage.setItem(IN_PROGRESS_RECIPES, JSON.stringify(inProgressRecipes));
};
