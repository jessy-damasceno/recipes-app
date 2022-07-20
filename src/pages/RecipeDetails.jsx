import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import FoodDetails from '../components/FoodDetails';
import DrinkDetails from '../components/DrinkDetails';

function RecipeDetails({ match: { params: { id } } }) {
  const isFood = useHistory().location.pathname.includes('foods');

  return (
    <div>
      {isFood ? <FoodDetails id={ id } /> : <DrinkDetails id={ id } />}
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default RecipeDetails;
