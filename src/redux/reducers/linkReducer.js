import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_LINK:
      return {...state};
    case actionTypes.GET_LIST:
      var linkNames = [];
      action.payload.forEach(doc => {
        linkNames.push(doc.data().link);
      });
      return {...state, links: linkNames};
    default:
      return state;
  }
};
