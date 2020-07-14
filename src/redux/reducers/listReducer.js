import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_LIST:
      return {...state,};

    case actionTypes.GET_LIST:
      var listNames = [];
      action.payload.forEach(doc => {
        listNames.push(doc.id);
      });
      return {...state, lists: listNames};

    case actionTypes.DELETE_LIST_SUCCESS:
      console.log('success');
      return {...state, deleteList: true};

    case actionTypes.DELETE_LIST_FAILURE:
      console.log('failure')
      return {...state, deleteList:false, delError: 'Silinemedi'};

    default:
      return state;
  }
};
