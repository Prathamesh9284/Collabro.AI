// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8USMdgvUB0YJ8r45NCofe_Sr--cyiync",
  authDomain: "sihp-2135d.firebaseapp.com",
  databaseURL: "https://sihp-2135d-default-rtdb.firebaseio.com",
  projectId: "sihp-2135d",
  storageBucket: "sihp-2135d.firebasestorage.app",
  messagingSenderId: "321995673340",
  appId: "1:321995673340:web:183f6e7433bfde26cb5179"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
