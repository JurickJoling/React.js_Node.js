import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { MainLayout, Error404 } from './components';
import { Dashboard, auth, profile, bundles, plans, events, specials, locations, locationTypes, promoCodes, users } from './pages';

export default (
  <Route path="/" component={MainLayout}>
    <IndexRoute component={Dashboard} />
    {auth}
    {profile}
    {bundles}
    {plans}
    {events}
    {specials}
    {locations}
    {locationTypes}
    {promoCodes}
    {users}
    <Route path="*" component={Error404}/>
  </Route>
);