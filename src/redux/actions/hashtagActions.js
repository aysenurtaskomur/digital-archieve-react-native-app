import * as actionTypes from './actionTypes';
import * as firebase from 'firebase';

export const getAllHashtag = () => {
  const user = firebase.auth().currentUser;
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

export const searchAllLinks = (data) => {
  const user = firebase.auth().currentUser;
  var dizi=[];
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
          // doc.id.forEach(()=>{console.log("oldu")})
        });
        documents.forEach(i => {
          firebase
            .firestore()
            .collection('users')
            .doc(user.uid)
            .collection('Listeler')
            .doc(i)
            .collection('Kayıtlar')
            // .where("hashtag", "array-contains", data)
            .get()
            .then(querySnapshot=>{
                
                querySnapshot.forEach(doc => {
                  dizi.push(doc.data());
                
                });
                // console.log("hashtag reducer=> ", dizi);
                dispatch({type:actionTypes.GET_MATCH_HASHTAG,payload:dizi})
           
            })
            .then(()=>{
              
            })
        });



      });
  };
};
