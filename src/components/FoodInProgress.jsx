import React from 'react';
import PropTypes from 'prop-types';

const FoodInProgress = ({ id }) => {
  console.log(id);
  return (
    <div>
      {id}
    </div>
  );
};

FoodInProgress.propTypes = {
  id: PropTypes.string.isRequired,
};

export default FoodInProgress;
