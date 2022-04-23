// Import the functions you need from the SDKs you need
import firebase from "firebase";
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGyk3DAfnBpvhYBNj-bjVHyt2ayvfq0Ws",
  authDomain: "smart-e7fe6.firebaseapp.com",
  projectId: "smart-e7fe6",
  storageBucket: "smart-e7fe6.appspot.com",
  messagingSenderId: "205973716004",
  appId: "1:205973716004:web:ad6c553ddaf8a165caecb1",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default {
  firebase,
  db,
};
