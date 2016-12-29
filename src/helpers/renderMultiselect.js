import React, { PropTypes } from 'react';
import Multiselect from 'react-widgets/lib/Multiselect'
import cl from 'classnames';

function renderMultiselect({ input, label, ...rest }) {
// , { 'has-error': (touched && error) }
  return (
    <fieldset className={cl('form-group')}>
      {label ? <label>{label}</label> : null}
      <Multiselect {...input}
                   onBlur={() => input.onBlur()}
                   value={input.value || []}
                   {...rest} />
    </fieldset>
  );
}

renderMultiselect.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string
};

export default renderMultiselect;