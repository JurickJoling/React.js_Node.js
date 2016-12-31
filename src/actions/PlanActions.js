import { browserHistory } from 'react-router';

import { ADD_PLANS, ADD_PLAN, PLAN_ERROR, SHOW_PLAN, REMOVE_PLAN } from '../constants/Plan';

import { apiRequest } from '../utils';

export function addPlans(items = []) {
  return {
    type: ADD_PLANS,
    items
  };
}

export function addPlan(item = {}) {
  return {
    type: ADD_PLAN,
    item
  };
}

export function planError(errorMessage) {
  return {
    type: PLAN_ERROR,
    errorMessage
  };
}

export function showPlan(item = {}) {
  return {
    type: SHOW_PLAN,
    item
  };
}

export function removePlan(itemId) {
  return {
    type: REMOVE_PLAN,
    itemId
  };
}

export function fetchPlans({ search, include, order }) {
  // console.log('filters', filters);
  // filters ? `&where=${JSON.stringify({
  //     start_day: filters.start_day ? {
  //         $gte: {
  //           __type: Date,
  //           iso : filters.start_day
  //         }
  //       } : null,
  //     end_day: filters.end_day ? {
  //         $lte: {
  //           __type: Date,
  //           iso : filters.end_day
  //         }
  //       } : null
  //   })}` : null
  const url = [
    'EventDetail?',
    order ? `&order=${order}` : null,
    include ? `&include=${include}` : null,
    search ? `&where=${JSON.stringify({
      $or: [
        { title_event: { $regex: search, $options: 'i' } },
        { description_event: { $regex:  search, $options: 'i' } }
      ]
    })}` : null
  ].join('');

  return dispatch => apiRequest.get(url)
    .then(({ data: { results } }) => dispatch(addPlans(results)));
}

export function fetchPlan(itemId) {
  return dispatch => apiRequest.get('EventDetail', itemId)
    .then(({ data }) => dispatch(showPlan(data)))
    .catch(() => browserHistory.push('/not-found'));
}

export function createPlan({
  bundle,
  title_event, description_event, image, type_event,
  tags, locations,
  partner, start_day, count_attended, is21_age, estimated_cost, end_day,
  reoccur_monday, reoccur_tuesday, reoccur_wednesday, reoccur_thursday, reoccur_friday, reoccur_saturday, reoccur_sunday,
  featured, featured_name, featured_link, first_message
}) {
  return dispatch => apiRequest.post('EventDetail', {
    bundle: bundle ? {
      __type: 'Pointer',
      className: 'EventBundle',
      objectId: bundle.objectId
    } : null,
    start_day: start_day ? {
      __type: 'Date',
      iso: start_day
    } : null,
    end_day: end_day ? {
      __type: 'Date',
      iso: end_day
    } : null,
    title_event, description_event, image, type_event,
    tags, locations,
    partner, count_attended: parseInt(count_attended, 10), is21_age, estimated_cost,
    reoccur_monday, reoccur_tuesday, reoccur_wednesday, reoccur_thursday, reoccur_friday, reoccur_saturday, reoccur_sunday,
    featured, featured_name, featured_link, first_message
  })
    .then(() => browserHistory.push('/plans'))
    .catch(({ response: { data: { error } } }) => dispatch(planError(error)));
}

export function updatePlan(itemID, {
  bundle: { objectId },
  title_event, description_event, image, type_event,
  tags, locations,
  partner, start_day, count_attended, is21_age, estimated_cost, end_day,
  reoccur_monday, reoccur_tuesday, reoccur_wednesday, reoccur_thursday, reoccur_friday, reoccur_saturday, reoccur_sunday,
  featured, featured_name, featured_link, first_message
}) {
  return dispatch => apiRequest.put('EventDetail', itemID, {
    bundle: {
      __type: 'Pointer',
      className: 'EventBundle',
      objectId
    },
    start_day: start_day ? {
        __type: 'Date',
        iso: start_day
      } : null,
    end_day: end_day ? {
        __type: 'Date',
        iso: end_day
      } : null,
    title_event, description_event, image, type_event,
    tags, locations,
    partner, count_attended: parseInt(count_attended, 10), is21_age, estimated_cost,
    reoccur_monday, reoccur_tuesday, reoccur_wednesday, reoccur_thursday, reoccur_friday, reoccur_saturday, reoccur_sunday,
    featured, featured_name, featured_link, first_message
  })
    .then(() => browserHistory.push('/plans'))
    .catch(({ response: { data: { error } } }) => dispatch(planError(error)));
}

export function deletePlan(itemID) {
  return dispatch => apiRequest.delete('EventDetail', itemID)
    .then(() => dispatch(removePlan(itemID)))
    .then(() => browserHistory.push('/plans'));
}