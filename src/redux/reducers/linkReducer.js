import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_LINK:
      return {...state};
      
    case actionTypes.GET_LINK:
      var informationArr = []; 
      action.payload.forEach(doc => {
        informationArr.push(doc.data());
      });
      return {...state, linkInformation: informationArr};
    
    case actionTypes.GET_ALL_LINKS:
    return {...state, allLinksInfo: action.payload};
    default:
      return state;
  }
};
