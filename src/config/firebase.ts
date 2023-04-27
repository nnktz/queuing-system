import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

firebase.initializeApp({
  apiKey: "AIzaSyCKPSHrq7qE0Y4WS4bmyLfyEaBiTWeH3SI",
  authDomain: "fir-react-typescript-682c6.firebaseapp.com",
  projectId: "fir-react-typescript-682c6",
});

const db = firebase;

export default db;
