import * as actionTypes from './actionTypes';
import * as firebase from 'firebase';

export const saveLink = (link, list, hashtag) => {
  const user = firebase.auth().currentUser;

  var newLink = link.replace(new RegExp('/', 'g'), '-');
  var Ref = firebase
    .firestore()
    .collection('users')
    .doc(user.uid)
    .collection('Listeler')
    .doc(list)
    .collection('Kayıtlar')
    .doc(newLink);
  return dispatch => {
    Ref.set(
      {
        link: link,
        hashtag: firebase.firestore.FieldValue.arrayUnion(hashtag),
      },
      {merge: true},
    ).then(() => {
      dispatch({type: actionTypes.SAVE_LINK, payload: link});
    });
  };
};

export const getLink = listName => {
  const user = firebase.auth().currentUser;
  return dispatch => {
    firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .collection('Listeler')
      .doc(listName)
      .collection('Kayıtlar')
      .onSnapshot(querySnapshot => {
        dispatch({type: actionTypes.GET_LINK, payload: querySnapshot});
      });
  };
};

export const getAllLinks = data => {
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
              dispatch({type: actionTypes.GET_ALL_LINKS, payload: dizi});
            })
            .then(() => {});
        });
      });
  };
};