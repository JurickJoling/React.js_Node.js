import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

class FacebookLoginPage extends Component{

  render () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <FacebookLogin
              autoLoad
              appId="420009571539693"
              fields="name,email,picture"
              callback={(...args) => console.log('argsargsargsargs', args)}
              cssClass="btn btn-primary"
            />
          </div>
        </div>
      </div>
    );
  }

}

export default FacebookLoginPage;