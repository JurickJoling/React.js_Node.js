import { AUTH_USER, LOGOUT_USER, AUTH_ERROR } from '../constants/Auth';

const defaultState = {
  isAuthenticated: false,
  currentUser: {}
};

export default function AuthReducer(state = defaultState, { type, currentUser, errorMessage }) {
  switch (type) {
    case AUTH_USER:
      return { ...state, isAuthenticated: true, currentUser };
    case LOGOUT_USER:
      return { ...state, isAuthenticated: false, currentUser: {} };
    case AUTH_ERROR:
      return { ...state, errorMessage, currentUser: {} };
    default:
      return state;
  }
}
