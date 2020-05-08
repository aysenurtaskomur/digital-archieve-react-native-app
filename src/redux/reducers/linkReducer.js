import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState , action) => {
  switch (action.type) {
    case actionTypes.SAVE_LINK:
      // links.push()
      console.log('deneme: ', action.payload)
     return {...state , links: action.payload}
    default:
      return state;
  }
}