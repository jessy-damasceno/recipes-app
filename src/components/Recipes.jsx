import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { drinkContext, foodContext } from '../context/context';

const Recipes = ({ cocktails }) => {
  const { foods } = useContext(foodContext);
  const { drinks } = useContext(drinkContext);
  const maxIndex = 12;

  return cocktails ? (
    <div className="recipes-container">
      {drinks?.length > 1 && (
        <section className="food-section">
          {drinks.map(({ idDrink, strDrink, strDrinkThumb }, index) => {
            if (index < maxIndex) {
              return (
                <div
                  key={ idDrink }
                  data-testid={ `${index}-recipe-card` }
                  className="card-div"
                >
                  <p
                    data-testid={ `${index}-card-name` }
                    className="food-name"
                  >
                    {strDrink}
                  </p>
                  <img
                    src={ strDrinkThumb }
                    alt="Dish icon"
                    data-testid={ `${index}-card-img` }
                    className="food-image"
                  />
                </div>
              );
            }
            return '';
          })}
        </section>
      )}
    </div>
  ) : (
    <div className="recipes-container">
      {foods?.length > 1 && (
        <section className="food-section">
          {foods.map(({ idMeal, strMeal, strMealThumb }, index) => {
            if (index < maxIndex) {
              return (
                <div
                  key={ idMeal }
                  data-testid={ `${index}-recipe-card` }
                  className="card-div"
                >
                  <p
                    data-testid={ `${index}-card-name` }
                    className="food-name"
                  >
                    {strMeal}
                  </p>
                  <img
                    src={ strMealThumb }
                    alt="Dish icon"
                    data-testid={ `${index}-card-img` }
                    className="food-image"
                  />
                </div>
              );
            }
            return '';
          })}
        </section>
      )}
    </div>
  );
};

Recipes.propTypes = {
  cocktails: PropTypes.bool,
};

Recipes.defaultProps = {
  cocktails: false,
};

export default Recipes;
