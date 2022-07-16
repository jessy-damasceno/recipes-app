import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { foodContext } from './context';

function FoodProvider({ children }) {
  const [foods, setFoods] = useState([]);

  const contextValue = {
    foods,
    setFoods,
  };

  return (
    <foodContext.Provider value={ contextValue }>
      {children}
    </foodContext.Provider>
  );
}

FoodProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FoodProvider;
