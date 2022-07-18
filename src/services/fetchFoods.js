export const fetchSearchBarFoods = async (item, query) => {
  let endpoint = '';
  if (item === 'ingredient') {
    endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`;
  }
  if (item === 'name') {
    endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  }
  if (item === 'first-letter') {
    endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`;
  }

  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      if (!data.meals) {
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      return data.meals;
    });
};

export const fetchFoods = () => (
  fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((data) => data.meals)
    .catch((e) => console.log(e))
);

export const fetchFoodCategories = () => (
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json())
    .then((data) => {
      const array = ['All'];
      data.meals.forEach(({ strCategory }, i) => i < +'5' && array.push(strCategory));
      return array;
    })
    .catch((e) => console.log(e))
);

export const fetchFoodByCategories = (category) => (
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => response.json())
    .then((data) => data.meals)
    .catch((e) => console.log(e))
);
