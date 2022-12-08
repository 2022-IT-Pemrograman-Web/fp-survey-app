// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLmzEOmZkTAWmV-uyAnFX217jYaoX2Ync",
  authDomain: "ets-project-2ea40.firebaseapp.com",
  projectId: "ets-project-2ea40",
  storageBucket: "ets-project-2ea40.appspot.com",
  messagingSenderId: "739505112881",
  appId: "1:739505112881:web:5427329b8a73d90d4e9210",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
