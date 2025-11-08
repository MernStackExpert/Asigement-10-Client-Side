// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtVTkDaH78GRUHn71F3BlvxP29NaAz1tU",
  authDomain: "asigement-10.firebaseapp.com",
  projectId: "asigement-10",
  storageBucket: "asigement-10.firebasestorage.app",
  messagingSenderId: "596313991101",
  appId: "1:596313991101:web:04ac693075836bfc7d94d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);