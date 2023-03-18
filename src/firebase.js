import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "netflix-clone-v2-e3d87.firebaseapp.com",
  projectId: "netflix-clone-v2-e3d87",
  storageBucket: "netflix-clone-v2-e3d87.appspot.com",
  messagingSenderId: "228638632872",
  appId: "1:228638632872:web:c8ef9163ba6f4c98740b9d",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };
