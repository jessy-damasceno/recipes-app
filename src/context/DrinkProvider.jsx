import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { drinkContext } from './context';
import { fetchDrinks } from '../services/fetchDrinks';

function DrinkProvider({ children }) {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetchDrinks();
      setDrinks(response);
    };

    fetchAPI();
  }, []);

  const contextValue = {
    drinks,
    setDrinks,
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
