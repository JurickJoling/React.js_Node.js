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

export function createItinerary({
  bundle: { objectId },
  title_event, description_event, image,
  tags, location,
  partner, start_day, count_attended, is21_age, estimated_cost, end_day,
  reoccur_monday, reoccur_tuesday, reoccur_wednesday, reoccur_thursday, reoccur_friday, reoccur_saturday, reoccur_sunday,
  repeat_daily, featured, featured_name, featured_link, first_message
}) {
  return dispatch => apiRequest.post('EventDetail', {
    bundle: {
      __type: 'Pointer',
      className: 'EventBundle',
      objectId
    },
    title_event, description_event, image,
    tags, location,
    partner, start_day, count_attended: parseInt(count_attended, 10), is21_age, estimated_cost, end_day,
    reoccur_monday, reoccur_tuesday, reoccur_wednesday, reoccur_thursday, reoccur_friday, reoccur_saturday, reoccur_sunday,
    repeat_daily, featured, featured_name, featured_link, first_message
  })
    .then(() => browserHistory.push('/itineraries'))
    .catch(({ response: { data: { error } } }) => dispatch(itineraryError(error)));
}

export function updateItinerary(itemID, {
  bundle: { objectId },
  title_event, description_event, image,
  tags, location,
  partner, start_day, count_attended, is21_age, estimated_cost, end_day,
  reoccur_monday, reoccur_tuesday, reoccur_wednesday, reoccur_thursday, reoccur_friday, reoccur_saturday, reoccur_sunday,
  repeat_daily, featured, featured_name, featured_link, first_message
}) {
  return dispatch => apiRequest.put('EventDetail', itemID, {
    bundle: {
      __type: 'Pointer',
      className: 'EventBundle',
      objectId
    },
    start_day: {
      __type: 'Date',
      iso: start_day
    },
    title_event, description_event, image,
    tags, location,
    partner, count_attended: parseInt(count_attended, 10), is21_age, estimated_cost, end_day,
    reoccur_monday, reoccur_tuesday, reoccur_wednesday, reoccur_thursday, reoccur_friday, reoccur_saturday, reoccur_sunday,
    repeat_daily, featured, featured_name, featured_link, first_message
  })
    .then(() => browserHistory.push('/itineraries'))
    .catch(({ response: { data: { error } } }) => dispatch(itineraryError(error)));
}

export function deleteItinerary(itemID) {
  return dispatch => apiRequest.delete('EventDetail', itemID)
    .then(() => dispatch(removeItinerary(itemID)))
    .then(() => browserHistory.push('/itineraries'));
}
