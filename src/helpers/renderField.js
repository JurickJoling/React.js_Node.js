import React, { PropTypes } from 'react';

function renderField(props) {
  console.log('props', props);
  const { input, value, label, type, meta: { touched, error, warning } } = props;
  console.log('input', input, value);
  return (
    <fieldset className="form-group">
      <label>{label}</label>
      <div>
        <input className="form-control" {...input} placeholder={label} type={type}/>
        {touched && ((error && <div className="error">{error}</div>) || (warning && <div className="error">{warning}</div>))}
      </div>
    </fieldset>
  );
}

renderField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string
};

export default renderField;