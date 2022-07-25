import React, { useContext, useEffect, useState } from 'react';
import { drinkContext, foodContext } from '../context/context';
import { fetchDrinkCategories } from '../services/fetchDrinks';
import '../styles/Categories.css';

const DrinkCategories = () => {
  const { setDrinksByCategory } = useContext(drinkContext);
  const { acCategory, setAcCategory } = useContext(foodContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetchDrinkCategories();
      setCategories(response);
    };

    fetchCategories();
  }, []);

  const handleClick = (arg) => {
    setDrinksByCategory(arg);
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
          {e.split('/')[0]}
        </button>
      ))}
    </div>
  );
};

export default DrinkCategories;
