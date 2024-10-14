import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from 'firebase/storage'; // Import getStorage

// import {getStorage} from 'firebase/storage' // Remove this line
const app = {
    apiKey: "AIzaSyAqbvpHep5aNEWnf0gFVCXYJUhKYpWihBs",
    authDomain: "kehtisahayaak.firebaseapp.com",
    projectId: "kehtisahayaak",
    storageBucket: "kehtisahayaak.appspot.com",
    messagingSenderId: "968813007726",
    appId: "1:968813007726:web:e7a8cee962a7c74b7be77f"
  };

const FirebaseApp = initializeApp(app);
export const db = getFirestore(FirebaseApp);
export const storage = getStorage(FirebaseApp); // Export storage

export const auth = getAuth(FirebaseApp);
