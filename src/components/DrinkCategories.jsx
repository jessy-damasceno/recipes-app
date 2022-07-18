import React, { useContext, useEffect, useState } from 'react';
import { drinkContext } from '../context/context';
import { fetchDrinkCategories } from '../services/fetchDrinks';

const DrinkCategories = () => {
  const { setDrinksByCategory } = useContext(drinkContext);
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
  };

  console.log(categories);

  return (
    <div className="filter-buttons-container">
      {categories.map((e) => (
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

export default DrinkCategories;
