import React, { useState } from 'react';

const SearchBar = () => {
  const [searchBar, setSearchBar] = useState('');

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
            data-testid="ingredient-search-radio"
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="radio"
            id="name"
            data-testid="name-search-radio"
          />
        </label>
        <label htmlFor="first-letter">
          First Letter
          <input
            type="radio"
            id="first-letter"
            data-testid="first-letter-search-radio"
          />
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
