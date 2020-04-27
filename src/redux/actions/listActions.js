import * as actionTypes from './actionTypes';
import firebase from 'firebase';
import initialState from '../../redux/reducers/initialState';

export const createList = listName => {
  console.log('console1: ' + listName);
  const user = firebase.auth().currentUser;
  // var obj = {name: listName, code: '#d35400'};
  return dispatch => {
    return dispatch({
      type:actionTypes.CREATE_LIST,
      payload: 
      firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .collection(listName)
        .add({
          link: '1.kayıt',
        })
        .then(() => {
          console.log('console2: ' + listName);
          dispatch({type: actionTypes.CREATE_LIST});
          console.log('console3: ' + listName);
        })
        .catch((error) => {
          console.log(error);
        })
    })
    
  };
};
