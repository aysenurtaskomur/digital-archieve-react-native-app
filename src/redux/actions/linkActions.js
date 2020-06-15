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
        listname: list,
        link: link,
        hashtag: firebase.firestore.FieldValue.arrayUnion(hashtag),
      },
      {merge: true},
    ).then(() => {

      dispatch({type: actionTypes.SAVE_LINK});
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

export const getAllLinks = () => {
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

export const getSelectedHashLinks = hashtag => {
  const user = firebase.auth().currentUser;
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
            .where('hashtag', 'array-contains', hashtag)
            .get()
            .then(querySnapshot => {
              dispatch({
                type: actionTypes.GET_SELECTED_HASH_LINKS,
                payload: querySnapshot,
              });
            });
        });
      });
  };
};

export const deleteLink = (data, listName) => {
  var newData = data.replace(new RegExp('/', 'g'), '-');
  return dispatch => {
    //  dispatch({type: actionTypes.DELETE_LINK_LOADING});
    const user = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .collection('Listeler')
      .doc(listName)
      .collection('Kayıtlar')
      .doc(newData)
      .delete()
      .then(() => {
        dispatch({type: actionTypes.DELETE_LINK_SUCCESS});
      })
      .catch(() => {
        dispatch({type: actionTypes.DELETE_LINK_FAILURE});
      });
  };
};

export const hashtagAdd = (listName,link, hashtag )=> {
  var newLink = link.replace(new RegExp('/', 'g'), '-');
  return dispatch => {
    const user = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .collection('Listeler')
      .doc(listName)
      .collection('Kayıtlar')
      .doc(newLink)
      .set({
        hashtag: firebase.firestore.FieldValue.arrayUnion(hashtag),
      },{
        merge:true
      })
  };
};

