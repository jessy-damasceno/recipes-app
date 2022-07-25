import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { drinkContext, foodContext } from '../context/context';
import { fetchSearchBarDrinks } from '../services/fetchDrinks';
import { fetchSearchBarFoods } from '../services/fetchFoods';
import '../styles/SearchBar.css';

const SearchBar = () => {
  const [searchBar, setSearchBar] = useState('');
  const [radioValue, setRadioValue] = useState('ingredient');
  const { setFoods, actualFilter, setActualFilter } = useContext(foodContext);
  const { setDrinks } = useContext(drinkContext);
  const history = useHistory();
  const OPTION_BUTTON = 'option-button';
  const FIRST_LETTER = 'first-letter';

  const handleClick = async () => {
    if (radioValue === FIRST_LETTER && searchBar.length > 1) {
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

  const setOptions = (ing) => {
    setRadioValue(ing);
    setActualFilter(ing);
  };

  return (
    <main className="search-bar-container">
      <div className="text-input-div">
        <input
          type="text"
          data-testid="search-input"
          value={ searchBar }
          className="text-input"
          onChange={ (e) => setSearchBar(e.target.value) }
        />
        <BsSearch
          size={ 25 }
          onClick={ handleClick }
          className="search-bar-button"
        />
      </div>
      <div className="radio-buttons-container">
        {/* <label htmlFor="ingredient" className="search-bar-label">
          <input
            type="radio"
            id="ingredient"
            name="queryItem"
            value="ingredient"
            data-testid="ingredient-search-radio"
            onChange={ () => setRadioValue('ingredient') }
            className="radio-button"
          />
          ingredient
        </label> */}
        <button
          type="button"
          data-testid="ingredient-search-radio"
          onClick={ () => setOptions('ingredient') }
          className={ actualFilter === 'ingredient' ? 'colored' : OPTION_BUTTON }
        >
          ingredient
        </button>
        {/* <label htmlFor="name" className="search-bar-label">
          <input
            type="radio"
            id="name"
            name="queryItem"
            value="name"
            data-testid="name-search-radio"
            onChange={ () => setRadioValue('name') }
            className="radio-button"
          />
          name
        </label> */}
        <button
          type="button"
          data-testid="name-search-radio"
          onClick={ () => setOptions('name') }
          className={ actualFilter === 'name' ? 'colored' : OPTION_BUTTON }
        >
          name
        </button>
        {/* <label htmlFor="first-letter" className="search-bar-label">
          <input
            type="radio"
            id="first-letter"
            name="queryItem"
            value="first-letter"
            data-testid="first-letter-search-radio"
            onChange={ () => setRadioValue('first-letter') }
            className="radio-button"
          />
          first letter
        </label> */}
        <button
          type="button"
          data-testid="first-letter-search-radio"
          onClick={ () => setOptions('first-letter') }
          className={ actualFilter === FIRST_LETTER ? 'colored' : OPTION_BUTTON }
        >
          first letter
        </button>
      </div>
    </main>
  );
};

export default SearchBar;
