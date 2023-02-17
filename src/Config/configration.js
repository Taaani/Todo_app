// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgDI2D9idW_yGbU8SyaOqvuL5tRFEB5UM",
  authDomain: "mytodoapp-8996c.firebaseapp.com",
  projectId: "mytodoapp-8996c",
  storageBucket: "mytodoapp-8996c.appspot.com",
  messagingSenderId: "694287038218",
  appId: "1:694287038218:web:687fd24c4c0650b5286cf3",
  measurementId: "G-D7VXVPWGD2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const fireStore = getFirestore(app);
const storage = getStorage(app)
export { auth, fireStore, storage };
