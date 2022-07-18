import React, { useState, useEffect, useContext } from 'react';
import { foodContext } from '../context/context';
import { fetchFoodCategories } from '../services/fetchFoods';

const FoodCategories = () => {
  const { setFoodsByCategory } = useContext(foodContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetchFoodCategories();
      setCategories(response);
    };

    fetchCategories();
  }, []);

  const handleClick = (arg) => {
    console.log(typeof arg, arg);
    setFoodsByCategory(arg);
  };

  return (
    <div className="filter-buttons-container">
      {categories.length && categories.map((e) => (
        <button
          key={ e }
          type="button"
          onClick={ () => handleClick(e) }
          data-testid={ `${e}-category-filter` }
        >
          {e}
        </button>
      ))}
    </div>
  );
};

export default FoodCategories;
