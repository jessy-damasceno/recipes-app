import React, { useState, useContext } from 'react';
import { foodContext } from '../context/context';
import fetchSearchBarFoods from '../services/fetchFoods';

const SearchBar = () => {
  const [searchBar, setSearchBar] = useState('');
  const [radioValue, setRadioValue] = useState('ingredient');
  const { setFoods } = useContext(foodContext);

  const handleClick = async () => {
    if (radioValue === 'first-letter' && searchBar.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const foodsList = await fetchSearchBarFoods(radioValue, searchBar);
      setFoods(foodsList);
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default SearchBar;
