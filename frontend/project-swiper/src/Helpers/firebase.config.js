// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB868-My_zS0C1qhtTV42bvB64RxxGB28A",
  authDomain: "bgn-hack21-7006.firebaseapp.com",
  projectId: "bgn-hack21-7006",
  storageBucket: "bgn-hack21-7006.appspot.com",
  messagingSenderId: "574636002510",
  appId: "1:574636002510:web:3b0f2d9f38e7ce1a57949f",
  measurementId: "G-LEDK1Q3J3E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);