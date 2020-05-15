import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_HASHTAG:
      console.log("get hashtag reducer ", action.payload)
      return {...state};
    default:
      return state;
  }
};
