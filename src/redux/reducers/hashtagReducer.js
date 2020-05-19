import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MATCH_HASHTAG:
      return {...state, matchingLinkInfo: action.payload};
    default:
      return state;
  }
};
