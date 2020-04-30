import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_LIST:
      return {...state};
    case actionTypes.GET_LIST:
      return {...state, lists: action.payload};
    default:
      return state;
  }
};
