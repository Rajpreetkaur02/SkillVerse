// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA13M6VCZ68oWY84zEde1_FwVSt6NrrLVc",
  authDomain: "supr-8e99c.firebaseapp.com",
  projectId: "supr-8e99c",
  storageBucket: "supr-8e99c.appspot.com",
  messagingSenderId: "682009952500",
  appId: "1:682009952500:web:cc9d621a05a9056a649ea1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig) , db = getDatabase(app) , auth = getAuth(app) ;