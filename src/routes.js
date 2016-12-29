import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { MainLayout, Error404 } from './components';
import { Dashboard, bundles, itineraries } from './pages';

export default (
  <Route path="/" component={MainLayout}>
    <IndexRoute component={Dashboard} />
    {bundles}
    {itineraries}
    <Route path="*" component={Error404}/>
  </Route>
);