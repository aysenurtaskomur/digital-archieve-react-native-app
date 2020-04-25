import * as actionTypes from './actionTypes';
import firebase from 'firebase';

export const createList = listName => {
  console.log(listName);
  const user = firebase.auth().currentUser;
   return dispatch => {
   return dispatch({
      type: actionTypes.CREATE_LIST,
      payload: firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .collection(listName)
        .add({
          link: '1.kayıt',
        })
        .then(() => {
          console.log('basarili');
        })
        .catch(() => {
          console.log('error');
        })
    });
  }
};
