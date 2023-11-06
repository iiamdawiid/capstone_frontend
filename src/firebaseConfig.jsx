import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDqQ8CfyHFTpJ9jYE-oskWmFkY-yuur6r4",
  authDomain: "capstone-project-69734.firebaseapp.com",
  projectId: "capstone-project-69734",
  storageBucket: "capstone-project-69734.appspot.com",
  messagingSenderId: "9823260305",
  appId: "1:9823260305:web:ab875eb7d119a66e927930",
  measurementId: "G-CP7NQY7KHY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth, provider};