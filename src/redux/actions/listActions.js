import * as actionTypes from './actionTypes';
import firebase from 'firebase';

export const createList = listName => {
  const user = firebase.auth().currentUser;
  return dispatch => {
      firebase
      .firestore()
        .collection('users')
        .doc(user.uid)
        .collection('Listeler')
        .doc(listName)
        .set({
          liste: listName,
        })
        .then(() => {
          dispatch({type: actionTypes.CREATE_LIST_SUCCESS,payload:listName});
        })
        .catch(() => {
          dispatch({type: actionTypes.CREATE_LIST_FAILURE});
        })
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
      .onSnapshot(querySnapshot => {
        dispatch({type: actionTypes.GET_LIST, payload: querySnapshot});
      });
  };
};

export const deleteList = name => {
  const user = firebase.auth().currentUser;
  console.log('deleting');
  return dispatch => {
    firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .collection('Listeler')
      .doc(name)
      .delete()
      .then(() => {
        dispatch({type: actionTypes.DELETE_LIST_SUCCESS});
      })
      .catch(() => {
        dispatch({type: actionTypes.DELETE_LIST_FAILURE});
      });

  };
};
