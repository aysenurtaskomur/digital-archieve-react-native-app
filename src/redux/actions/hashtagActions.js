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
        dispatch({
          type: actionTypes.GET_ALLHASHTAG,
          payload: doc.data().allhashtag,
        });
      });
  };
};

export const searchAllLinks = () => {
  const user = firebase.auth().currentUser;

  return dispatch => {
    console.log("asas")
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
        documents.map(i => {
          firebase
            .firestore()
            .collection('users')
            .doc(user.uid)
            .collection('Listeler')
            .doc(i)
            .collection('Kayıtlar')
            .onSnapshot(querySnapshot=>{
              var x=[];
              querySnapshot.forEach(doc=>{
                x.push(doc.data().hashtag);
                // console.log("aaaa: ",doc.data().hashtag)
              })
              console.log("e :", x)



              
            })
        });
      });
  };
};
