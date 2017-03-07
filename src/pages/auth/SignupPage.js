import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signupUser } from '../../actions/AuthActions';

import { SignupForm } from '../../components';

class SignupPage extends Component {

  render() {
    const { errorMessage, signupUser } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3 className="signup-title">Sign Up</h3>
            <SignupForm
              errorMessage={errorMessage}
              onSignup={user => signupUser(user)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({
  auth: {
    isAuthenticated,
    errorMessage
  }
}) => ({ isAuthenticated, errorMessage }), { signupUser })(SignupPage);
