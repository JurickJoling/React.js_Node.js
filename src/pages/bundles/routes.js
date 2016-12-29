import React from 'react';
import { Route, IndexRoute } from 'react-router';

import BundlesIndexPage from './BundlesIndexPage';
import BundleAddPage from './BundleAddPage';
import BundleShowPage from './BundleShowPage';
import BundleEditPage from './BundleEditPage';
import BundleDeletePage from './BundleDeletePage';

export default (
  <Route path="bundles">
    <IndexRoute component={BundlesIndexPage} />
    <Route path="new" component={BundleAddPage} />
    <Route path=":itemID/edit" component={BundleEditPage} />
    <Route path=":itemID/delete" component={BundleDeletePage} />
    <Route path=":itemID" component={BundleShowPage} />
  </Route>
);
