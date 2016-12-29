import React from 'react';
import { Route, IndexRoute } from 'react-router';

import BundlesIndexPage from './BundlesIndexPage';
import BundleAddPage from './BundleAddPage';
import BundleShowPage from './BundleShowPage';

export default (
  <Route path="bundles">
    <IndexRoute component={BundlesIndexPage} />
    <Route path="new" component={BundleAddPage} />
    <Route path=":itemID" component={BundleShowPage} />
  </Route>
);
