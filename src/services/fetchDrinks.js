const fetchSearchBarDrinks = async (item, query) => {
  let endpoint = '';
  if (item === 'ingredient') {
    endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query}`;
  }
  if (item === 'name') {
    endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`;
  }
  if (item === 'first-letter') {
    endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${query}`;
  }

  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      if (!data.drinks) {
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      return data.drinks;
    });
};

export default fetchSearchBarDrinks;
