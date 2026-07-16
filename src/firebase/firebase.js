import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFEW7KrRbYZ3j-WJfdSRGhoezkiKGy2Ow",
  authDomain: "attendance-tracker-d5112.firebaseapp.com",
  projectId: "attendance-tracker-d5112",
  storageBucket: "attendance-tracker-d5112.firebasestorage.app",
  messagingSenderId: "3727868879",
  appId: "1:3727868879:web:3b6034aeba272a701e08ba",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export default app;