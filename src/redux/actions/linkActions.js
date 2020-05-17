import * as actionTypes from './actionTypes';
import * as firebase from 'firebase';


export const saveLink = (link, list,hashtag) => {
  const user = firebase.auth().currentUser;
 
  var newLink = link.replace(new RegExp("/","g"),"-");
  var Ref= firebase.firestore().collection('users').doc(user.uid).collection('Listeler').doc(list).collection('Kayıtlar').doc(newLink);
  var Ref2 = firebase.firestore().collection('users').doc(user.uid);
  return dispatch => {
     Ref.set({
      link: link,
      hashtag: firebase.firestore.FieldValue.arrayUnion(hashtag)},
      {merge: true})
    .then(()=>{
      Ref2.set({
        allhashtag: firebase.firestore.FieldValue.arrayUnion(hashtag)},
        {merge: true})
        .then(()=>{
        dispatch({type:actionTypes.SAVE_LINK , payload: link})
      })
      })
    }
  }

export const getLink = (listName) =>{
   const user = firebase.auth().currentUser;
  return dispatch => {
    firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .collection('Listeler')
      .doc(listName)
      .collection('Kayıtlar')
      .onSnapshot(querySnapshot=>{
        dispatch({type:actionTypes.GET_LIST, payload: querySnapshot})
      })
}
}