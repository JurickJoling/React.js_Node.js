import React, { Component } from 'react';
import { FacebookLogin } from 'react-facebook-login-component';

class FacebookLoginPage extends Component{

  render () {
    return (
      <div>
        <FacebookLogin
          xfbml
          socialId="245755372526951"
          language="en_US"
          scope="public_profile,email"
          responseHandler={(...args) => console.log('argsargs', args)}
          version="v2.5"
          class="facebook-login"
          buttonText="Login With Facebook"
        />
      </div>
    );
  }

}

export default FacebookLoginPage;