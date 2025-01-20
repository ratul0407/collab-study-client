// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDymaB1oYuKskWnRAuFmCqKIb5vqenWcwM",
  authDomain: "dragon-news-e3f80.firebaseapp.com",
  projectId: "dragon-news-e3f80",
  storageBucket: "dragon-news-e3f80.firebasestorage.app",
  messagingSenderId: "855054066873",
  appId: "1:855054066873:web:fc41141d27d1eee9d06768",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
