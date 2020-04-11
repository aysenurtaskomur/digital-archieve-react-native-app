import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading:false,
        error: '',
      };
    case actionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading:false,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading:false,
        error: '',
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading:false,
      };
    case actionTypes.LOGIN_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
};

