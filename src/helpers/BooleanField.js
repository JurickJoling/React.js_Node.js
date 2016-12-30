import React, { PropTypes } from 'react';

function BooleanField({ value }) {
  return (
    <span>
      {value ? 'Yes' : 'No'}
    </span>
  );
}

BooleanField.propTypes = {
  value: PropTypes.bool
};

export default BooleanField;
