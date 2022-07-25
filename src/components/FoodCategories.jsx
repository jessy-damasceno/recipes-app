import React, { useState, useEffect, useContext } from 'react';
import { foodContext } from '../context/context';
import { fetchFoodCategories } from '../services/fetchFoods';
import '../styles/Categories.css';

const FoodCategories = () => {
  const { setFoodsByCategory, acCategory, setAcCategory } = useContext(foodContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetchFoodCategories();
      setCategories(response);
    };

    fetchCategories();
  }, []);

  const handleClick = (arg) => {
    setFoodsByCategory(arg);
    setAcCategory(arg);
  };

  return (
    <div className="filter-buttons-container">
      {categories.map((e) => (
        <button
          key={ e }
          type="button"
          onClick={ () => handleClick(e) }
          data-testid={ `${e}-category-filter` }
          className={ acCategory === e ? 'category-button c-active' : 'category-button' }
        >
          {e}
        </button>
      ))}
    </div>
  );
};

export default FoodCategories;
