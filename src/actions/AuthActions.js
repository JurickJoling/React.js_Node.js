import first from 'lodash/first';
import Promise from 'bluebird';
import { browserHistory } from 'react-router';

import { AUTH_USER, LOGOUT_USER, AUTH_ERROR } from '../constants/Auth';

import { apiRequest } from '../utils';

export function authUser({ email, accessToken, currentUser }) {
  localStorage.setItem('email', email);
  localStorage.setItem('token', accessToken);
  return {
    type: AUTH_USER,
    currentUser
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
      const url = `User?count=1&where=${JSON.stringify({ user_email: email })}`;
      return apiRequest.get(url)
        .then(({ data: { results, count } }) => {

          const user = first(results);

          if (count === 1 && user.is_admin !== 'no') {
            return dispatch(authUser({ email, accessToken, currentUser: user }));
          } else {
            return dispatch(logoutUser());
          }
        });
    }

    return Promise.resolve(dispatch(logoutUser()));
  };
}

export function facebookLoginUser({ email, accessToken }) {
  const url = `User?count=1&where=${JSON.stringify({ user_email: email })}`;
  return dispatch => apiRequest.get(url)
    .then(({ data: { results, count } }) => {

      const user = first(results);

      if (count === 1 && user.is_admin !== 'no') {
        dispatch(authUser({ email, accessToken, currentUser: user }))
      } else {
        dispatch(authError('Bad Login Info'))
      }
    });
}

export function signinUser({ email, password }) {
  return dispatch => apiRequest.authPost('signin', { email, password })
    .then(({ data: { token, user } }) => {
      dispatch(authUser({
        email,
        accessToken: token,
        currentUser: {
          ...user,
          objectId: user._id
        }
      }));
      browserHistory.push('/');
    })
    .catch(() => dispatch(authError('Bad Login Info')));
}

export function signupUser({ email, password }) {
  return dispatch => apiRequest.authPost('signup', { email, password })
    .then(({ data: { token, user } }) => {
      dispatch(authUser({ email, accessToken: token, currentUser: user }));
      browserHistory.push('/');
    })
    .catch(({ response: { data } }) => dispatch(authError(data.error || 'Bad Login Info')));
}

export function logoutUser() {
  localStorage.removeItem('email');
  localStorage.removeItem('token');
  return {
    type: LOGOUT_USER
  };
}