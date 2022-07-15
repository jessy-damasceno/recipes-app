import React from 'react';
import PropTypes from 'prop-types';
import { drinkContext } from './context';

function DrinkProvider({ children }) {
  const data = {};

  return (
    <drinkContext.Provider value={ data }>
      {children}
    </drinkContext.Provider>
  );
}

DrinkProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DrinkProvider;
