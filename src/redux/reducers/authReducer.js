import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: '',
      };
    case actionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: '',
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

