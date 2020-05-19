import * as actionTypes from './actionTypes';
import * as firebase from 'firebase';

export const searchAllLinks = data => {
  const user = firebase.auth().currentUser;
  var dizi = [];
  return dispatch => {
    firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .collection('Listeler')
      .onSnapshot(querySnapshot => {
        var documents = [];
        querySnapshot.forEach(doc => {
          documents.push(doc.id);
        });
        documents.forEach(i => {
          firebase
            .firestore()
            .collection('users')
            .doc(user.uid)
            .collection('Listeler')
            .doc(i)
            .collection('Kayıtlar')
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                dizi.push(doc.data());
              });
              dispatch({type: actionTypes.GET_MATCH_HASHTAG, payload: dizi});
            })
            .then(() => {});
        });
      });
  };
};
