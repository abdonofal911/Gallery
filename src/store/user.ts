import {
  LOGOUT_USER,
  SAVE_USER_INFO,
  LOGIN_PENDING,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  SIGNUP_PENDING,
  SIGNUP_FULFILLED,
  SIGNUP_REJECTED,
} from '../actions/index';

import { UserState } from './types';


interface Action {
  type: string;
  payload?: any;
}

const initialState: UserState = {
  email: '',
  idToken: '',
  localId: '',
  loginLoader: false,
  signupLoader: false,
};

const userReducer = (state = initialState, action: Action): UserState => {
  switch (action.type) {
    case LOGOUT_USER:
      return {
        ...initialState,
      };
    case SAVE_USER_INFO:
      return {
        ...state,
        localId: action.payload.localId,
        email: action.payload.email,
        idToken: action.payload.idToken,
      };
    case LOGIN_PENDING:
      return {
        ...state,
        loginLoader: true,
      };
    case LOGIN_FULFILLED:
      return {
        ...state,
        localId: action.payload.localId,
        email: action.payload.email,
        idToken: action.payload.idToken,
        loginLoader: false,
      };
    case LOGIN_REJECTED:
      return {
        ...state,
        loginLoader: false,
      };
    case SIGNUP_PENDING:
      return {
        ...state,
        signupLoader: true,
      };
    case SIGNUP_FULFILLED:
      return {
        ...state,
        localId: action.payload.localId,
        email: action.payload.email,
        idToken: action.payload.idToken,
        signupLoader: false,
      };
    case SIGNUP_REJECTED:
      return {
        ...state,
        signupLoader: false,
      };
    default:
      return state;
  }
};

export default userReducer;
