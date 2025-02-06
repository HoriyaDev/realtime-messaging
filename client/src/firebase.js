// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3q14YVkL-MZqYP7Oi75n11bXwv1XB8ZU",
  authDomain: "chat-app-3c68e.firebaseapp.com",
  projectId: "chat-app-3c68e",
  storageBucket: "chat-app-3c68e.firebasestorage.app",
  messagingSenderId: "476256800248",
  appId: "1:476256800248:web:922d75b724f7d5310b9a0d"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;