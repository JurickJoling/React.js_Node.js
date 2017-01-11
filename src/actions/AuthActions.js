import first from 'lodash/first';
import Promise from 'bluebird';
import { browserHistory } from 'react-router';

import { AUTH_USER, LOGOUT_USER, AUTH_ERROR } from '../constants/Auth';

import { apiRequest } from '../utils';

export function authUser({ email, accessToken }) {
  localStorage.setItem('email', email);
  localStorage.setItem('token', accessToken);
  return {
    type: AUTH_USER
  };
}

export function authError(errorMessage) {
  return {
    type: AUTH_ERROR,
    errorMessage
  };
}

export function validateToken() {
  const email = localStorage.getItem('email');
  const accessToken = localStorage.getItem('token');

  return dispatch => {
    if (email && accessToken) {
      const url = `Users?count=1&where=${JSON.stringify({ user_email: email })}`;
      return apiRequest.get(url)
        .then(({ data: { results, count } }) => {

          const user = first(results);

          if (count === 1 && user.is_admin !== 'no') {
            return dispatch(authUser({ email, accessToken }));
          } else {
            return dispatch(logoutUser());
          }
        });
    }

    return Promise.resolve(dispatch(logoutUser()));
  };
}

export function loginUser({ email, accessToken }) {
  const url = `Users?count=1&where=${JSON.stringify({ user_email: email })}`;
  return dispatch => apiRequest.get(url)
    .then(({ data: { results, count } }) => {

      const user = first(results);

      if (count === 1 && user.is_admin !== 'no') {
        dispatch(authUser({ email, accessToken }))
      } else {
        dispatch(authError('Bad Login Info'))
      }
    });
}

export function signupUser({ email, password }) {
  return dispatch => apiRequest.authPost('signup', { email, password })
    .then(({ data: { jwt } }) => {
      dispatch(authUser({ email, jwt }));
      browserHistory.push('/');
    })
    .catch(({ data: { error } }) => dispatch(authError(error)));
}

export function logoutUser() {
  localStorage.removeItem('email');
  localStorage.removeItem('token');
  return {
    type: LOGOUT_USER
  };
}