// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NUXT_FIREBASE_API_KEY,
  authDomain: "schedules-20dba.firebaseapp.com",
  projectId: "schedules-20dba",
  storageBucket: "schedules-20dba.firebasestorage.app",
  messagingSenderId: "382717320392",
  appId: "1:382717320392:web:bfb0ce7a124aa310bf19fd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
