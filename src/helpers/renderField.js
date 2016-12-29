import React, { PropTypes } from 'react';

function renderField({ input, label, type, meta: { touched, error, warning } }) {
  return (
    <div>
      <label>{label}</label>
      <div>
        <input className="form-control" {...input} placeholder={label} type={type}/>
        {touched && ((error && <div className="error">{error}</div>) || (warning && <div className="error">{warning}</div>))}
      </div>
    </div>
  );
}

renderField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string
};

export default renderField;