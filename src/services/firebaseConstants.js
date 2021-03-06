import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyCxjRIi9IGpdfe2wNvB9XD8J2eVCtIwwso",
  authDomain: "kevana-89fef.firebaseapp.com",
  databaseURL: "https://kevana-89fef.firebaseio.com",
  projectId: "kevana-89fef",
  storageBucket: "kevana-89fef.appspot.com",
  messagingSenderId: "283508830300"
};

firebase.initializeApp(config);

const firestoreTimestampFix = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestoreTimestampFix.settings(settings);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
export const storage = firebase.storage();
export const firestore = firestoreTimestampFix;