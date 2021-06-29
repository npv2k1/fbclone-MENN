import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAhk8liW89YrMSZBX27zOLjg1nZfyXgk3U",
  authDomain: "fbclone-ca564.firebaseapp.com",
  projectId: "fbclone-ca564",
  storageBucket: "fbclone-ca564.appspot.com",
  messagingSenderId: "50738868592",
  appId: "1:50738868592:web:3a4efdf020c6a552fd1fb5",
};
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage };
