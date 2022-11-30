// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADc9MgLhipNNT5qCzSiaEp2BCJSDilj9A",
  authDomain: "tinyseeds-2bf49.firebaseapp.com",
  projectId: "tinyseeds-2bf49",
  storageBucket: "tinyseeds-2bf49.appspot.com",
  messagingSenderId: "255105946857",
  appId: "1:255105946857:web:8482211f70f97735becc78",
  measurementId: "G-MNQ600CHJ7",
  databaseURL: "https://tinyseeds-2bf49-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
const analytics = getAnalytics(app);
