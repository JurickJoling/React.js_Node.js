import React from 'react';
import { Route, IndexRoute } from 'react-router';

import ItinerariesIndexPage from './ItinerariesIndexPage';
import ItineraryAddPage from './ItineraryAddPage';
import ItineraryShowPage from './ItineraryShowPage';
import ItineraryEditPage from './ItineraryEditPage';
import ItineraryDeletePage from './ItineraryDeletePage';

export default (
  <Route path="itineraries">
    <IndexRoute component={ItinerariesIndexPage} />
    <Route path="new" component={ItineraryAddPage} />
    <Route path=":itemID/edit" component={ItineraryEditPage} />
    <Route path=":itemID/delete" component={ItineraryDeletePage} />
    <Route path=":itemID" component={ItineraryShowPage} />
  </Route>
);
