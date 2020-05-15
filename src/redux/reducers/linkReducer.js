import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_LINK:
      return {...state};
      
    case actionTypes.GET_LIST:
      var informationArr = []; 
      action.payload.forEach(doc => {
        informationArr.push(doc.data());
      });
      return {...state, linkInformation: informationArr};
    default:
      return state;
  }
};
