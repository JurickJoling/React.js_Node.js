import React from 'react';
import { Route, IndexRoute } from 'react-router';

import EventsIndexPage from './EventsIndexPage';
import EventAddPage from './EventAddPage';
import EventShowPage from './EventShowPage';
import EventEditPage from './EventEditPage';
import EventDeletePage from './EventDeletePage';

export default (
  <Route path="events">
    <IndexRoute component={EventsIndexPage} />
    <Route path="new" component={EventAddPage} />
    <Route path=":itemID/edit" component={EventEditPage} />
    <Route path=":itemID/delete" component={EventDeletePage} />
    <Route path=":itemID" component={EventShowPage} />
  </Route>
);
