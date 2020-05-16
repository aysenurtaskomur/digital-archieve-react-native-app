import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALLHASHTAG:
      console.log("get hashtag reducer ", action.payload)
     
      return {...state, hashtagAll: action.payload };
    default:
      return state;
  }
};
