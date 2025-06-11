// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSEwYcbf9t-dlfURZeMxVwHImutACgt84",
  authDomain: "elike-deborah.firebaseapp.com",
  projectId: "elike-deborah",
  storageBucket: "elike-deborah.firebasestorage.app",
  messagingSenderId: "651086630702",
  appId: "1:651086630702:web:71a399bc73e7378b5474bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firestore
const db = getFirestore(app);

export { db };