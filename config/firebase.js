import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAS6dGw1Jq1NvRWfxugcISK3vu3dGqfpCM",
  authDomain: "digital-archive-a9f80.firebaseapp.com",
  databaseURL: "https://digital-archive-a9f80.firebaseio.com",
  projectId: "digital-archive-a9f80",
  storageBucket: "digital-archive-a9f80.appspot.com",
  messagingSenderId: "859921158438",
  appId: "1:859921158438:web:c76e6c16af7cfa0ef371e7",
  measurementId: "G-ZHNDJ7DF2H"
};

const Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase