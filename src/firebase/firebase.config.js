// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7XwcbGiAXYEMjBEUYFwEdZ44gkL5jhlM",
  authDomain: "user-email-password-auth-49e43.firebaseapp.com",
  projectId: "user-email-password-auth-49e43",
  storageBucket: "user-email-password-auth-49e43.appspot.com",
  messagingSenderId: "1007013211242",
  appId: "1:1007013211242:web:a4ca4d80631948b0272e13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;