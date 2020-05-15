import * as actionTypes from './actionTypes';
import * as firebase from 'firebase';

export const getHashtag = (link, list, hashtag) => {
  const user = firebase.auth().currentUser;
  console.log("gethashtag actions ",link)
  console.log("gethashtag actions ",list)
  console.log("gethashtag actions ",hashtag)
  return dispatch => {
   firebase
    .firestore()
    .collection('users')
    .doc(user.uid)
    .collection('Listeler')
    .doc(list)
    .collection('Kayıtlar')
    .doc(link)
    .onSnapshot(doc=> {
      dispatch({type:actionTypes.GET_HASHTAG,payload:doc.data().hashtag})
       
    })
  };
  
};
