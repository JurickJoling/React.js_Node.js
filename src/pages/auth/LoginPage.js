import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/AuthActions';

import { SigninForm } from '../../components';

class LoginPage extends Component {

  render() {
    const { errorMessage, loginUser } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <SigninForm
              errorMessage={errorMessage}
              onSignin={({ email, password }) => loginUser({ email, password })}
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
}) => ({ isAuthenticated, errorMessage }), { loginUser })(LoginPage);
