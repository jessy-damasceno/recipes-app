import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { drinkContext, foodContext } from '../context/context';

const Recipes = ({ cocktails }) => {
  const { foods } = useContext(foodContext);
  const { drinks } = useContext(drinkContext);
  const maxIndex = 12;

  return cocktails ? (
    <div className="recipes-container">
      {drinks?.length >= 1 && (
        <section className="food-section">
          {drinks.map(({ idDrink, strDrink, strDrinkThumb }, index) => {
            if (index < maxIndex) {
              return (
                <div
                  key={ idDrink }
                  data-testid={ `${index}-recipe-card` }
                  className="card-div"
                >
                  <Link to={ `/drinks/${idDrink}` }>
                    <img
                      src={ strDrinkThumb }
                      alt="Dish icon"
                      data-testid={ `${index}-card-img` }
                      className="food-image"
                    />
                    <div className="food-name">
                      <p
                        data-testid={ `${index}-card-name` }
                      >
                        {strDrink}
                      </p>
                    </div>
                  </Link>
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
      {foods?.length >= 1 && (
        <section className="food-section">
          {foods.map(({ idMeal, strMeal, strMealThumb }, index) => {
            if (index < maxIndex) {
              return (
                <div
                  key={ idMeal }
                  data-testid={ `${index}-recipe-card` }
                  className="card-div"
                >
                  <Link to={ `/foods/${idMeal}` }>
                    <img
                      src={ strMealThumb }
                      alt="Dish icon"
                      data-testid={ `${index}-card-img` }
                      className="food-image"
                    />
                    <p
                      data-testid={ `${index}-card-name` }
                      className="food-name"
                    >
                      {strMeal}
                    </p>
                  </Link>
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
