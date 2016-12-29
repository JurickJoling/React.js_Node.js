import { browserHistory } from 'react-router';

import { ADD_BUNDLES, ADD_BUNDLE, SHOW_BUNDLE, REMOVE_BUNDLE } from '../constants/Bundle';

import { apiRequest } from '../utils';

export function addBundles(items = []) {
  return {
    type: ADD_BUNDLES,
    items
  };
}

export function addBundle(item = {}) {
  return {
    type: ADD_BUNDLE,
    item
  };
}

export function showBundle(item = {}) {
  return {
    type: SHOW_BUNDLE,
    item
  };
}

export function removeBundle(itemId) {
  return {
    type: REMOVE_BUNDLE,
    itemId
  };
}

export function fetchBundles() {
  return dispatch => apiRequest.get('EventBundle')
    .then(({ data: { results } }) => dispatch(addBundles(results)));
}

export function fetchBundle(itemId) {
  return dispatch => apiRequest.get('EventBundle', itemId)
    .then(({ data }) => dispatch(showBundle(data)))
    .catch(() => browserHistory.push('/not-found'));
}

export function createBundle(bundle) {
  return dispatch => apiRequest.post('EventBundle', bundle)
    .then(() => browserHistory.push('/bundles'));
}

export function deleteBundle(bundleId) {
  return dispatch => apiRequest.delete('EventBundle', bundleId)
    .then(() => dispatch(removeBundle(bundleId)));
}
