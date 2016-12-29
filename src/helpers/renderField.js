import React, { PropTypes } from 'react';
import cl from 'classnames';

function renderField({ input, type, label, placeholder, meta: { touched, error, warning } }) {
  return (
    <fieldset className={cl('form-group', { 'has-error': (touched && error) })}>
      {label ? <label>{label}</label> : null}
      {type  === 'textarea' ? (
          <textarea className="form-control" {...input} placeholder={placeholder || label} type={type} />
        ) : (
          <input className="form-control" {...input} placeholder={placeholder || label} type={type} />
        )}
      {touched && ((error && <div className="error help-block">{error}</div>) || (warning && <div className="error">{warning}</div>))}
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