import React from 'react';
import PropTypes from 'prop-types';
import FoodInProgress from '../components/FoodInProgress';
import DrinkInProgress from '../components/DrinkInProgress';

function RecipeInProgress({ match: { params: { id } } }) {
  const isFood = useHistory().location.pathname.includes('foods');
  return (
    <div>
      {isFood ? <FoodInProgress id={ id } /> : <DrinkInProgress id={ id } />}
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default RecipeInProgress;
