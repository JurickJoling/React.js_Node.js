import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { MainLayout, Error404 } from './components';
import { Dashboard, bundles } from './pages';

export default (
  <Route path="/" component={MainLayout}>
    <IndexRoute component={Dashboard} />
    {bundles}
    <Route path="*" component={Error404}/>
  </Route>
);