import moment from 'moment';
import { browserHistory } from 'react-router';

import { ADD_EVENTS, ADD_EVENT, EVENT_ERROR, SHOW_EVENT, REMOVE_EVENT } from '../constants/Event';

import { apiRequest } from '../utils';

export function addEvents(items = [], count = 0) {
  return {
    type: ADD_EVENTS,
    items,
    count
  };
}

export function addEvent(item = {}) {
  return {
    type: ADD_EVENT,
    item
  };
}

export function eventError(errorMessage) {
  return {
    type: EVENT_ERROR,
    errorMessage
  };
}

export function showEvent(item = {}) {
  return {
    type: SHOW_EVENT,
    item
  };
}

export function removeEvent(itemId) {
  return {
    type: REMOVE_EVENT,
    itemId
  };
}

export function fetchEvents({ search, include, order }) {
  const url = [
    'Event?count=1',
    order ? `&order=${order}` : null,
    include ? `&include=${include}` : null,
    search ? `&where=${JSON.stringify({
        $or: [
          { description: { $regex: search, $options: 'i' } }
        ]
      })}` : null
  ].join('');

  return dispatch => apiRequest.get(url)
    .then(({ data: { results, count } }) => dispatch(addEvents(results, count)));
}

export function fetchEvent(itemId) {
  return dispatch => apiRequest.get('Event', itemId, '?include=location,special')
    .then(({ data }) => dispatch(showEvent(data)))
    .catch(() => browserHistory.push('/not-found'));
}

export function createEvent(event) {
  return dispatch => apiRequest.post('Event', {
    ...event,
    location: event.location ? {
        __type: 'Pointer',
        className: 'Location',
        objectId: event.location.objectId
      } : null,
    special: event.special ? {
        __type: 'Pointer',
        className: 'Special',
        objectId: event.special.objectId
      } : null,
  })
    .then(() => browserHistory.push('/events'))
    .catch(({ response: { data: { error } } }) => dispatch(eventError(error)));
}

export function updateEvent(itemID, event) {
  return dispatch => apiRequest.put('Event', itemID, {
    ...event,
    location: event.location ? {
        __type: 'Pointer',
        className: 'Location',
        objectId: event.location.objectId
      } : null,
    special: event.special ? {
        __type: 'Pointer',
        className: 'Special',
        objectId: event.special.objectId
      } : null,
  })
    .then(() => browserHistory.push('/events'))
    .catch(({ response: { data: { error } } }) => dispatch(eventError(error)));
}

export function deleteEvent(itemID) {
  return dispatch => apiRequest.delete('Event', itemID)
    .then(() => dispatch(removeEvent(itemID)))
    .then(() => browserHistory.push('/events'));
}
