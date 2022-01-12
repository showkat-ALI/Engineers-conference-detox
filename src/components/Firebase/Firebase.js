import firebase from "firebase/app";
import "firebase/auth";
export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyDY1RcTOTEmnXmbcBOzDDPp-BFe7jiDtVc",
    authDomain: "engineers-arena.firebaseapp.com",
    projectId: "engineers-arena",
    storageBucket: "engineers-arena.appspot.com",
    messagingSenderId: "223164889335",
    appId: "1:223164889335:web:7998af0637dc08613dbbf2",
  })
  .auth();
