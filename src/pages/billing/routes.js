import React from 'react';
import { Route, IndexRoute } from 'react-router';

import PaymentMethodsIndexPage from './PaymentMethodsIndexPage';
import PaymentMethodAddPage from './PaymentMethodAddPage';
import PaymentMethodShowPage from './PaymentMethodShowPage';
import PaymentMethodEditPage from './PaymentMethodEditPage';
import PaymentMethodDeletePage from './PaymentMethodDeletePage';

import { RequireAuth } from '../../utils';

export default (
  <Route path="billing">
    <IndexRoute component={RequireAuth(PaymentMethodsIndexPage)} />
    <Route path="new" component={RequireAuth(PaymentMethodAddPage)} />
    <Route path=":itemID/edit" component={RequireAuth(PaymentMethodEditPage)} />
    <Route path=":itemID/delete" component={RequireAuth(PaymentMethodDeletePage)} />
    <Route path=":itemID" component={RequireAuth(PaymentMethodShowPage)} />
  </Route>
);
