import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { drinkContext } from './context';

function DrinkProvider({ children }) {
  const [drinks, setDrinks] = useState([]);

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
