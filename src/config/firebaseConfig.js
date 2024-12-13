// firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth"; // Import necessary services
import { getFirestore } from "firebase/firestore"; // Import Firestore if you plan to use it

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSyq8H2A_BzRzGmo79o3nKfQKlR-NU5YQ",
  authDomain: "vibes-auth-e42b3.firebaseapp.com",
  projectId: "vibes-auth-e42b3",
  storageBucket: "vibes-auth-e42b3.firebasestorage.app",
  messagingSenderId: "60869847949",
  appId: "1:60869847949:web:44e0ce0e54643b3c1cebc4",
  measurementId: "G-NWRM0W0H44",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get authentication service
const googleProvider = new GoogleAuthProvider(); // Initialize Google sign-in provider
const firestore = getFirestore(app); // Initialize Firestore
const firebaseApp = initializeApp(firebaseConfig);

export {
  auth,
  firestore,
  firebaseApp,
  googleProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  signInWithPopup,
};
