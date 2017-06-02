import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signupUser } from '../../actions/AuthActions';

import { SignupForm } from '../../components';

class SignupPage extends Component {

  render() {
    const { errorMessage, signupUser } = this.props;
    return (
      <div className="middle-box text-center loginscreen animated fadeInDown">
        <p className="logo-name">Signup New Account</p>
        <SignupForm
          errorMessage={errorMessage}
          onSignup={user => signupUser(user)}
        />
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
