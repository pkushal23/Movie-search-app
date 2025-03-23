import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBYIDj4oO6Q1SnnZTYsDAlIs2KrWmg2z_k",
  authDomain: "movie-search-app-525f4.firebaseapp.com",
  projectId: "movie-search-app-525f4",
  storageBucket: "movie-search-app-525f4.appspot.com", // Fixed incorrect storage URL
  messagingSenderId: "564567649133",
  appId: "1:564567649133:web:5c79101b3055c658338864"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Simplified Firestore initialization

export { auth, db };
