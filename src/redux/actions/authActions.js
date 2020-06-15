import * as actionTypes from './actionTypes';
import firebase from 'firebase';
import {CommonActions} from '@react-navigation/native';

export const signUp = (email, password, fullName, navigation) => {
  return dispatch => {
    dispatch({type: actionTypes.LOGIN_LOADING});

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        dispatch({type: actionTypes.SIGNUP_SUCCESS, payload: res.user});

        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'MainNavigator'}],
          }),
        );

        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            firebase
              .firestore()
              .collection('users')
              .doc(user.uid)
              .set({
                id: user.uid,
                fullName: fullName,
              })
              .then(() => {
                firebase
                  .firestore()
                  .collection('users')
                  .doc(user.uid)
                  .collection('Listeler')
                  .doc('Tüm Kayıtlarım')
                  .set({
                    liste: 'Tüm Kayıtlarım',
                  })
                  .then(() => {
                    console.log('yazildi');
                  });
              });
          }
        });
      })
      .catch(err => {
        dispatch({type: actionTypes.SIGNUP_FAILURE, payload: err.message});
      });
  };
};
export const signIn = (email, password, navigation) => {
  return dispatch => {
    dispatch({type: actionTypes.LOGIN_LOADING});

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        dispatch({type: actionTypes.LOGIN_SUCCESS, payload: res.user});
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'MainNavigator'}],
          }),
        );
      })
      .catch(err => {
        dispatch({type: actionTypes.LOGIN_FAILURE, payload: err.message});
      });
  };
};

export const getFullName = () => {
  const user = firebase.auth().currentUser;
  return dispatch => {
    firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(doc => {
        // console.log(doc.data().fullName);
        dispatch({type:actionTypes.GET_USER_DATA,payload:doc.data().fullName})
      });
  };
};
