import React from 'react';
import { Route, IndexRoute } from 'react-router';

import FacebookLoginPage from './FacebookLoginPage';

export default (
  <Route path="auth">
    <Route path="facebook" component={FacebookLoginPage} />
  </Route>
);
