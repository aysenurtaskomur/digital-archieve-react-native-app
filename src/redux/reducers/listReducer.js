import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_LIST:
      return {...state,...initialState};
    case actionTypes.GET_LIST:
      return  {lists: action.payload};
    default:
      return state;
  }
}