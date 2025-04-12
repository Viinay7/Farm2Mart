// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8Pli9FqlE-ijIm4h2VmXohItoWvNmC2Q",
  authDomain: "farm2market-ba6ea.firebaseapp.com",
  projectId: "farm2market-ba6ea",
  storageBucket: "farm2market-ba6ea.firebasestorage.app",
  messagingSenderId: "447305949489",
  appId: "1:447305949489:web:ab15199b7678e1e13ad010",
  measurementId: "G-9SC3LKM0KH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;