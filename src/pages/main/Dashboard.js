import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/AuthActions';

import { DataTable } from '../../components';

function Dashboard({ isAuthenticated, errorMessage, loginUser }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          {isAuthenticated ? (
              <h1>Dashboard</h1>
            ) : (
              <div>
                <FacebookLogin
                  appId="420009571539693"
                  fields="name,email,picture"
                  callback={({ email, accessToken }) => loginUser({ email, accessToken })}
                  cssClass="btn btn-primary"
                />
                {errorMessage ? <div className="alert alert-danger m-t">{errorMessage}</div> : null }
              </div>
            )}
        </div>
      </div>
      {isAuthenticated ? <DataTable /> : null}
    </div>
  );
}

export default connect(({ auth: { isAuthenticated, errorMessage } }) => ({ isAuthenticated, errorMessage }), { loginUser })(Dashboard);
