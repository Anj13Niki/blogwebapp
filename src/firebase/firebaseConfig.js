import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import {getAuth} from 'firebase/auth'
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANMu6BaTQOLQM5qAENE4szzEvQIDO7Zmo",
  authDomain: "reactwebapp-67044.firebaseapp.com",
  projectId: "reactwebapp-67044",
  storageBucket: "reactwebapp-67044.appspot.com",
  messagingSenderId: "66588502794",
  appId: "1:66588502794:web:e7dcc149b05e666ba0a8f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
