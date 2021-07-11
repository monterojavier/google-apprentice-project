import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyB_WmLTaaYqHIDHN9qdTdZ7LkysjcbY0qQ",
  authDomain: "shopping-list-project-5498d.firebaseapp.com",
  projectId: "shopping-list-project-5498d",
  storageBucket: "shopping-list-project-5498d.appspot.com",
  messagingSenderId: "630525146277",
  appId: "1:630525146277:web:197501e66d8d09406a894c",
  measurementId: "G-887B8FV5LB",
};
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
