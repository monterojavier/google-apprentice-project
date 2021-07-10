import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDjFCm94d29CG1GKPYjDl6mXSpgOPpvY0k",
  authDomain: "shopping-list-319216.firebaseapp.com",
  projectId: "shopping-list-319216",
  storageBucket: "shopping-list-319216.appspot.com",
  messagingSenderId: "547878507788",
  appId: "1:547878507788:web:63c3fd53a808c368fbe529",
  measurementId: "G-Z1Z1MPXVPY",
};
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
