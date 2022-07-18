import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { foodContext } from './context';
import { fetchFoods } from '../services/fetchFoods';

function FoodProvider({ children }) {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetchFoods();
      setFoods(response);
    };

    fetchAPI();
  }, []);

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
