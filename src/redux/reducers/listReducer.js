import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_LIST:
      return {...state};
    case actionTypes.GET_LIST:
      var listNames = [];
      action.payload.forEach(doc => {
        listNames.push(doc.id);
      });
      console.log(listNames);
      return {...state, lists: listNames};
    default:
      return state;
  }
};
