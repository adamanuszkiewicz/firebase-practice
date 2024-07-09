// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBl4t0RwAcNvVT-QwdhUalNQ47AV-xAI3g",
  authDomain: "fir-practice-41644.firebaseapp.com",
  projectId: "fir-practice-41644",
  storageBucket: "fir-practice-41644.appspot.com",
  messagingSenderId: "948088685978",
  appId: "1:948088685978:web:c37c5f4c96129bea992623"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();