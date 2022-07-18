import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { drinkContext } from './context';
import { fetchDrinkByCategories, fetchDrinks } from '../services/fetchDrinks';

function DrinkProvider({ children }) {
  const [drinksData, setDrinksData] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [atualDrinkCategory, setAtualDrinkCategory] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetchDrinks();
      setDrinksData(response);
    };

    fetchAPI();
  }, []);

  useEffect(() => {
    const fetchAPI = () => {
      setDrinks(drinksData);
    };

    fetchAPI();
  }, [drinksData]);

  const setDrinksByCategory = async (category) => {
    if (category === atualDrinkCategory || category === 'All') {
      setDrinks(drinksData);
      setAtualDrinkCategory('All');
    } else {
      const response = await fetchDrinkByCategories(category);
      setAtualDrinkCategory(category);
      setDrinks(response);
    }
  };

  const contextValue = {
    // states
    drinks,
    // funcs
    setDrinks,
    setDrinksByCategory,
  };

  return (
    <drinkContext.Provider value={ contextValue }>
      {children}
    </drinkContext.Provider>
  );
}

DrinkProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DrinkProvider;
