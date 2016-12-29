import { browserHistory } from 'react-router';

import { ADD_TAGS, ADD_TAG, TAG_ERROR, SHOW_TAG, REMOVE_TAG } from '../constants/Tag';

import { apiRequest } from '../utils';

export function addTags(items = []) {
  return {
    type: ADD_TAGS,
    items
  };
}

export function addTag(item = {}) {
  return {
    type: ADD_TAG,
    item
  };
}

export function tagError(errorMessage) {
  return {
    type: TAG_ERROR,
    errorMessage
  };
}

export function showTag(item = {}) {
  return {
    type: SHOW_TAG,
    item
  };
}

export function removeTag(itemId) {
  return {
    type: REMOVE_TAG,
    itemId
  };
}

export function fetchTags({ search }) {
  const url = `EventTags?order=tag${search ? `&where={"tag":{"$regex":"${search}"}}` : ''}`;

  return dispatch => apiRequest.get(url)
    .then(({ data: { results } }) => dispatch(addTags(results)));
}

export function fetchTag(itemId) {
  return dispatch => apiRequest.get('EventTag', itemId)
    .then(({ data }) => dispatch(showTag(data)))
    .catch(() => browserHistory.push('/not-found'));
}

export function createTag({ heading, priority, banner }) {
  return dispatch => apiRequest.post('EventTag', { heading, banner, priority: parseInt(priority, 10) })
    .then(() => browserHistory.push('/tags'))
    .catch(({ response: { data: { error } } }) => dispatch(tagError(error)));
}

export function updateTag(itemID, { heading, priority, banner }) {
  return dispatch => apiRequest.put('EventTag', itemID, { heading, banner, priority: parseInt(priority, 10) })
    .then(() => browserHistory.push('/tags'))
    .catch(({ response: { data: { error } } }) => dispatch(tagError(error)));
}

export function deleteTag(itemID) {
  return dispatch => apiRequest.delete('EventTag', itemID)
    .then(() => dispatch(removeTag(itemID)))
    .then(() => browserHistory.push('/tags'));
}
