import * as actionTypes from './actionTypes';
import firebase from 'firebase';

export const createList = listName => {
  const user = firebase.auth().currentUser;
  return dispatch => {
    return dispatch({
      type: actionTypes.CREATE_LIST,
      payload: firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .collection('Listeler')
        .doc(listName)
        .set({
          liste: 'dfdfdd',
        })
        .then(() => {
          dispatch({type: actionTypes.CREATE_LIST});
        })
        .catch(error => {
          console.log(error);
        }),
    });
  };
};

export const getList = () => {
  const user = firebase.auth().currentUser;
  return dispatch => {
    firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .collection('Listeler')
      .onSnapshot((querySnapshot) =>  {
        dispatch({type: actionTypes.GET_LIST, payload: querySnapshot});
      })
  };
};
