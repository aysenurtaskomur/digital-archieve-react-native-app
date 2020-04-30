import * as actionTypes from './actionTypes';
import firebase from 'firebase';
import initialState from '../../redux/reducers/initialState';

export const createList = listName => {
  console.log('console1: ' + listName);
  const user = firebase.auth().currentUser;
  // var arr=[];
  // var obj = {name: listName, code: '#d35400'};
  // var assign = arr.push(obj);
  return dispatch => {
    return dispatch({
      type: actionTypes.CREATE_LIST,
      payload: firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .collection('Listeler')
        .doc(listName)
        .set({
          liste: 'dfdfdd',
        })
        .then(() => {
          console.log('console2: ' + listName);
          dispatch({type: actionTypes.CREATE_LIST});
          console.log('console3: ' + listName);
        })
        .catch(error => {
          console.log(error);
        }),
    });
  };
};

export const getList = () => {
  const user = firebase.auth().currentUser;
  return dispatch => {
    console.log('actions');
    firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .collection('Listeler')
      .get()
      .then((querySnapshot) =>  {
        // var listNames = [];
        // querySnapshot.forEach(doc => { 
        //   listNames.push(doc.id);
        //   console.log(listNames)
        // })
        dispatch({type: actionTypes.GET_LIST, payload: querySnapshot});
      })
      .catch(error=>{console.log(error)})
  };
};
