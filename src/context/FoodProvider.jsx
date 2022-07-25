import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { foodContext } from './context';
import { fetchFoodByCategories, fetchFoods } from '../services/fetchFoods';

function FoodProvider({ children }) {
  const [foodData, setFoodData] = useState([]);
  const [foods, setFoods] = useState([]);
  const [atualFoodCategory, setAtualFoodCategory] = useState('All');
  const [actualFilter, setActualFilter] = useState('');
  const [acCategory, setAcCategory] = useState('');

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetchFoods();
      setFoodData(response);
    };

    fetchAPI();
  }, []);

  useEffect(() => {
    const fetchAPI = () => {
      setFoods(foodData);
    };

    fetchAPI();
  }, [foodData]);

  const setFoodsByCategory = async (category) => {
    if (category === atualFoodCategory || category === 'All') {
      setFoods(foodData);
      setAtualFoodCategory('All');
    } else {
      const response = await fetchFoodByCategories(category);
      setAtualFoodCategory(category);
      setFoods(response);
    }
  };

  const contextValue = {
    // states
    foods,
    foodData,
    // funcs
    setFoods,
    setFoodsByCategory,
    actualFilter,
    setActualFilter,
    acCategory,
    setAcCategory,
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
