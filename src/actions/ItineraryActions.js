import { browserHistory } from 'react-router';

import { ADD_ITINERARIES, ADD_ITINERARY, ITINERARY_ERROR, SHOW_ITINERARY, REMOVE_ITINERARY } from '../constants/Itinerary';

import { apiRequest } from '../utils';

export function addItineraries(items = []) {
  return {
    type: ADD_ITINERARIES,
    items
  };
}

export function addItinerary(item = {}) {
  return {
    type: ADD_ITINERARY,
    item
  };
}

export function itineraryError(errorMessage) {
  return {
    type: ITINERARY_ERROR,
    errorMessage
  };
}

export function showItinerary(item = {}) {
  return {
    type: SHOW_ITINERARY,
    item
  };
}

export function removeItinerary(itemId) {
  return {
    type: REMOVE_ITINERARY,
    itemId
  };
}

export function fetchItineraries({ search }) {
  const url = `EventDetail?order=-createdAt${search ? `&where={"title_event":{"$regex":"${search}"}}` : ''}`;

  return dispatch => apiRequest.get(url)
    .then(({ data: { results } }) => dispatch(addItineraries(results)));
}

export function fetchItinerary(itemId) {
  return dispatch => apiRequest.get('EventDetail', itemId)
    .then(({ data }) => dispatch(showItinerary(data)))
    .catch(() => browserHistory.push('/not-found'));
}

export function createItinerary({ heading, priority, banner }) {
  return dispatch => apiRequest.post('EventDetail', { heading, banner, priority: parseInt(priority, 10) })
    .then(() => browserHistory.push('/itineraries'))
    .catch(({ response: { data: { error } } }) => dispatch(itineraryError(error)));
}

export function updateItinerary(itemID, itinerary) {
  return dispatch => apiRequest.put('EventDetail', itemID, itinerary)
    .then(() => browserHistory.push('/itineraries'))
    .catch(({ response: { data: { error } } }) => dispatch(itineraryError(error)));
}

export function deleteItinerary(itemID) {
  return dispatch => apiRequest.delete('EventDetail', itemID)
    .then(() => dispatch(removeItinerary(itemID)))
    .then(() => browserHistory.push('/itineraries'));
}
