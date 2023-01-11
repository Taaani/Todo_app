// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOxFpZDlwF-sUqj2eM9ayvsW44fkYlG7g",
  authDomain: "mytodo-659dc.firebaseapp.com",
  projectId: "mytodo-659dc",
  storageBucket: "mytodo-659dc.appspot.com",
  messagingSenderId: "589577890096",
  appId: "1:589577890096:web:d31487a45f3b0e626f80f5",
  measurementId: "G-EMFWB1GBCK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const fireStore = getFirestore(app);
export { auth, fireStore };
