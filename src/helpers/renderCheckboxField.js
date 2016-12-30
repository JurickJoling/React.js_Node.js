import React, { PropTypes } from 'react';
import cl from 'classnames';

function renderCheckboxField({ input, type, label, placeholder, meta: { touched, error, warning } }) {
  return (
    <fieldset className={cl('form-group', { 'has-error': (touched && error) })}>
      <label>
        <input className="form-control-checkbox" {...input} placeholder={placeholder || label} type="checkbox" />
        {label}
      </label>
      {touched && ((error && <div className="error help-block">{error}</div>) || (warning && <div className="error">{warning}</div>))}
    </fieldset>
  );
}

renderCheckboxField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string
};

export default renderCheckboxField;