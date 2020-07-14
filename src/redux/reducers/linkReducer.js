import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_LINK:
      return {...state, addedLink: true};

    case actionTypes.GET_LINK:
      var informationArr = [];
      action.payload.forEach(doc => {
        informationArr.push(doc.data());
      });
      return {...state, linkInformation: informationArr};

    case actionTypes.GET_ALL_LINKS:
      return {...state, allLinksInfo: action.payload};

    case actionTypes.GET_SELECTED_HASH_LINKS:
      var selected = [];
      action.payload.forEach(doc => {
        selected.push(doc.data());
      });
      return {...state, selectedHashLinks: selected};

    case actionTypes.DELETE_LINK_SUCCESS:
      console.log('deleted link')
      return {...state, delete:true}

    case actionTypes.DELETE_LINK_FAILURE:
      console.log("delete link error")
      return {...state, delete:false, deleteError: 'Silinemedi'}

    default:
      return state;
  }
};
