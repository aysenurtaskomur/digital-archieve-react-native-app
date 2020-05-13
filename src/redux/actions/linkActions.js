import * as actionTypes from './actionTypes';
import firebase from 'firebase';


export const saveLink = (link, list,hashtag) => {
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
      link: link,
      hashtag: [hashtag]
    }) 
    .then(()=>{
      dispatch({type:actionTypes.SAVE_LINK , payload: link})
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