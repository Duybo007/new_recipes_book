// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import {getStorage} from "firebase/storage"
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyBkg-iCFS1q5D9jxMZJtVM1vQ8uEa-Ak30",
  
    authDomain: "new-recipe-app-7512d.firebaseapp.com",
  
    projectId: "new-recipe-app-7512d",
  
    storageBucket: "new-recipe-app-7512d.appspot.com",
  
    messagingSenderId: "1036503849938",
  
    appId: "1:1036503849938:web:d55cab1f7dbee614bcc60b"
  
  };
  
const apiKey = "377fedd8a7674309a40704af3a9a70ce"
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()

export const auth = getAuth(app);

export { app, db, storage, apiKey}