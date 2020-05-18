import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALLHASHTAG:
      console.log('get hashtag reducer ', action.payload);

      return {...state, hashtagAll: action.payload};

    case actionTypes.GET_MATCH_HASHTAG:
      // var x = [];
      // action.payload.forEach(doc => {
      //   x.push(doc.data());
      // });
      // console.log('denemece: ', x);

      // console.log("ne basiyomus gorelim: ", action.payload)
      return {...state, matchingLinkInfo: action.payload};
    default:
      return state;
  }
};
