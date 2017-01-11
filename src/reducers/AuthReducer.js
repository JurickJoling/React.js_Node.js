import { AUTH_USER, LOGOUT_USER, AUTH_ERROR } from '../constants/Auth';

const defaultState = {
  isAuthenticated: false
};

export default function AuthReducer(state = defaultState, { type, errorMessage }) {
  switch (type) {
    case AUTH_USER:
      return { ...state, isAuthenticated: true };
    case LOGOUT_USER:
      return { ...state, isAuthenticated: false };
    case AUTH_ERROR:
      return { ...state, errorMessage };
    default:
      return state;
  }
}
