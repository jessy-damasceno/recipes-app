export const KEY_USER = 'user';
export const DONE_RECIPES = 'doneRecipes';

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
