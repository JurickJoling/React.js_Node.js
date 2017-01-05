import React from 'react';
import { Route, IndexRoute } from 'react-router';

import UsersIndexPage from './UsersIndexPage';
import UserAddPage from './UserAddPage';
import UserShowPage from './UserShowPage';
import UserEditPage from './UserEditPage';
import UserDeletePage from './UserDeletePage';

export default (
  <Route path="users">
    <IndexRoute component={UsersIndexPage} />
    <Route path="new" component={UserAddPage} />
    <Route path=":itemID/edit" component={UserEditPage} />
    <Route path=":itemID/delete" component={UserDeletePage} />
    <Route path=":itemID" component={UserShowPage} />
  </Route>
);
