import moment from 'moment';
import { browserHistory } from 'react-router';

import { ADD_LOCATIONS, ADD_LOCATION, LOCATION_ERROR, SHOW_LOCATION, REMOVE_LOCATION } from '../constants/Location';

import { apiRequest } from '../utils';

export function addLocations(items = [], count = 0) {
  return {
    type: ADD_LOCATIONS,
    items,
    count
  };
}

export function addLocation(item = {}) {
  return {
    type: ADD_LOCATION,
    item
  };
}

export function locationError(errorMessage) {
  return {
    type: LOCATION_ERROR,
    errorMessage
  };
}

export function showLocation(item = {}) {
  return {
    type: SHOW_LOCATION,
    item
  };
}

export function removeLocation(itemId) {
  return {
    type: REMOVE_LOCATION,
    itemId
  };
}

export function fetchLocations({ search, include, order }) {
  const url = [
    'Location?count=1',
    order ? `&order=${order}` : null,
    include ? `&include=${include}` : null,
    search ? `&where=${JSON.stringify({
        $or: [
          { first_name: { $regex: search, $options: 'i' } },
          { last_name: { $regex:  search, $options: 'i' } },
          { location_email: { $regex:  search, $options: 'i' } },
        ]
      })}` : null
  ].join('');

  return dispatch => apiRequest.get(url)
    .then(({ data: { results, count } }) => dispatch(addLocations(results, count)));
}

export function fetchLocation(itemId) {
  return dispatch => apiRequest.get('Location', itemId)
    .then(({ data }) => dispatch(showLocation(data)))
    .catch(() => browserHistory.push('/not-found'));
}

export function createLocation(location) {
  return dispatch => apiRequest.post('Location', {
    ...location,
    birthday: location.birthday ? moment(location.birthday).format('MM/DD/YYYY') : null
  })
    .then(() => browserHistory.push('/locations'))
    .catch(({ response: { data: { error } } }) => dispatch(locationError(error)));
}

export function updateLocation(itemID, location) {
  return dispatch => apiRequest.put('Location', itemID, {
    ...location,
    birthday: location.birthday ? moment(location.birthday).format('MM/DD/YYYY') : null
  })
    .then(() => browserHistory.push('/locations'))
    .catch(({ response: { data: { error } } }) => dispatch(locationError(error)));
}

export function deleteLocation(itemID) {
  return dispatch => apiRequest.delete('Location', itemID)
    .then(() => dispatch(removeLocation(itemID)))
    .then(() => browserHistory.push('/locations'));
}
