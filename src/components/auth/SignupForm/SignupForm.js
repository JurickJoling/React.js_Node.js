import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import { renderField } from '../../../helpers';

class SignupForm extends Component {

  render() {
    const { errorMessage, handleSubmit, onSignup } = this.props;

    return (
      <form onSubmit={handleSubmit(({ email, password }) => onSignup({ email, password }))}>
        <Field name="email" component={renderField} className="form-control" label="Email" />
        <Field name="password" component={renderField} className="form-control" type="password" label="Password" />
        <Field name="passwordConfirmation" component={renderField} className="form-control" type="password" label="Confirm Password" />
        {errorMessage ? (
            <div className="alert alert-danger">
              <strong>Oops!</strong> {errorMessage}
            </div>
          ) : null}
        <button action="submit" className="btn btn-primary">Sign Up</button>
      </form>
    );
  }
}

function validate({ email, password, passwordConfirmation }) {
  const errors = {};

  if (!email) {
    errors.email = 'Please enter an email';
  }

  if (!password) {
    errors.password = 'Please enter a password';
  }

  if (!passwordConfirmation) {
    errors.passwordConfirmation = 'Please enter a password confirmation';
  }

  if (password !== passwordConfirmation) {
    errors.password = 'Passwords must match';
  }
  return errors;
}

export default reduxForm({ form: 'signin', validate })(SignupForm);