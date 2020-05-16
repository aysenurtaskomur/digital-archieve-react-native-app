import * as actionTypes from './actionTypes';
import * as firebase from 'firebase';

export const getAllHashtag = () => {
  const user = firebase.auth().currentUser;
  console.log('getallhashtag');
  return dispatch => {
    firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot(doc => {
        dispatch({type: actionTypes.GET_ALLHASHTAG, payload:doc.data().allhashtag })
      });
  };
};
