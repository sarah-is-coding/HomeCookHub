import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGgxcZliGnzZa_K2PZ4sc5bdrOjPAu5Ro",
  authDomain: "homecookhub-0.firebaseapp.com",
  projectId: "homecookhub-0",
  storageBucket: "homecookhub-0.appspot.com",
  messagingSenderId: "454367080500",
  appId: "1:454367080500:web:214319e1e98d2405021a61",
  measurementId: "G-FNCPSCNPP8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
