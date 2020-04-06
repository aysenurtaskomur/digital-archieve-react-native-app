import * as actionTypes from './actionTypes';
import firebase from 'firebase';

export const signUp = (email, password) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        dispatch({type: actionTypes.SIGNUP_SUCCESS, payload: res.user});
      })
      .catch((err) => {
        dispatch({type: actionTypes.SIGNUP_FAILURE, payload: err.message});
      });
  };
};
export const signIn = (email, password) => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        dispatch({type: actionTypes.LOGIN_SUCCESS, payload: res.user});
      })
      .catch((err) => {
        dispatch({type: actionTypes.LOGIN_FAILURE, payload: err.message});
      });
  };
};

