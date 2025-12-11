// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKkIjySRasOWjyV8X7wL8hXYrFGGoUIxA",
  authDomain: "noteapp-c8767.firebaseapp.com",
  projectId: "noteapp-c8767",
  storageBucket: "noteapp-c8767.firebasestorage.app",
  messagingSenderId: "576668221285",
  appId: "1:576668221285:web:cd29584ca4c14bd79c6b8c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Authentication
export const auth = getAuth(app);
