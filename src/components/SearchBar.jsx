import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { drinkContext, foodContext } from '../context/context';
import { fetchSearchBarDrinks } from '../services/fetchDrinks';
import { fetchSearchBarFoods } from '../services/fetchFoods';

const SearchBar = () => {
  const [searchBar, setSearchBar] = useState('');
  const [radioValue, setRadioValue] = useState('ingredient');
  const { setFoods } = useContext(foodContext);
  const { setDrinks } = useContext(drinkContext);
  const history = useHistory();

  const handleClick = async () => {
    if (radioValue === 'first-letter' && searchBar.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      if (history.location.pathname === '/foods') {
        const foodsList = await fetchSearchBarFoods(radioValue, searchBar);
        setFoods(foodsList);
        if (foodsList?.length === 1) history.push(`/foods/${foodsList[0].idMeal}`);
      }
      if (history.location.pathname === '/drinks') {
        const drinksList = await fetchSearchBarDrinks(radioValue, searchBar);
        setDrinks(drinksList);
        if (drinksList?.length === 1) history.push(`/drinks/${drinksList[0].idDrink}`);
      }
    }
  };

  return (
    <main>
      <input
        type="text"
        data-testid="search-input"
        value={ searchBar }
        onChange={ (e) => setSearchBar(e.target.value) }
      />
      <div>
        <label htmlFor="ingredient">
          Ingredient
          <input
            type="radio"
            id="ingredient"
            name="queryItem"
            value="ingredient"
            data-testid="ingredient-search-radio"
            onChange={ () => setRadioValue('ingredient') }
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="radio"
            id="name"
            name="queryItem"
            value="name"
            data-testid="name-search-radio"
            onChange={ () => setRadioValue('name') }
          />
        </label>
        <label htmlFor="first-letter">
          First Letter
          <input
            type="radio"
            id="first-letter"
            name="queryItem"
            value="first-letter"
            data-testid="first-letter-search-radio"
            onChange={ () => setRadioValue('first-letter') }
          />
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Buscar
      </button>
    </main>
  );
};

export default SearchBar;
