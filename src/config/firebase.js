import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace with your actual Firebase project configuration
// To get this:
// 1. Go to Firebase Console (console.firebase.google.com)
// 2. Create a new project or select an existing one
// 3. Add a Web App to your project
// 4. Copy the config object below
const firebaseConfig = {
  apiKey: "AIzaSyC5_lGs5IsPLfK9WZEHKnaHMacZdCcDpN8",
  authDomain: "uiuxproject-b5e69.firebaseapp.com",
  projectId: "uiuxproject-b5e69",
  storageBucket: "uiuxproject-b5e69.firebasestorage.app",
  messagingSenderId: "599649275745",
  appId: "1:599649275745:web:d382efeb9ebfe43a187f20",
  measurementId: "G-81L4M319CJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
