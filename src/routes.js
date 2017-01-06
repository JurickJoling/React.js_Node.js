import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { MainLayout, Error404 } from './components';
import { Dashboard, bundles, plans, specials, locations, users } from './pages';

export default (
  <Route path="/" component={MainLayout}>
    <IndexRoute component={Dashboard} />
    {bundles}
    {plans}
    {specials}
    {locations}
    {users}
    <Route path="*" component={Error404}/>
  </Route>
);