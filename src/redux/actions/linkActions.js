import * as actionTypes from './actionTypes';
import firebase from 'firebase';


export const saveLink = (link, list ) => {
  const user = firebase.auth().currentUser;
  return dispatch => {
    firebase
    .firestore()
    .collection('users')
    .doc(user.uid)
    .collection('Listeler')
    .doc(list)
    .collection('Kayıtlar')
    .add({
      linkornek : link
    })
    .then(()=>{
      dispatch({type:actionTypes.SAVE_LINK , payload: link})
    })
  }
}