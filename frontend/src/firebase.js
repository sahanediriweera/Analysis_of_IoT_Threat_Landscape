import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = {

  apiKey: "AIzaSyD7lwwKBcm7HTTNER9pBzfQTmxhZG3m2fU",
  authDomain: "auth-fyp.firebaseapp.com",
  projectId: "auth-fyp",
  storageBucket: "auth-fyp.appspot.com",
  messagingSenderId: "698123344256",
  appId: "1:698123344256:web:d6418929e8fa44bf28c965",
  measurementId: "G-EG36GK6SLB"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
