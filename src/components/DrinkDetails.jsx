import React from 'react';
import PropTypes from 'prop-types';

const DrinkDetails = ({ id }) => {
  console.log(id);
  return (
    <div>
      DrinkDetails
      {id}
    </div>
  );
};

DrinkDetails.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DrinkDetails;
