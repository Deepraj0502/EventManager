import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCKSjd0lX3cv47F72M2oNhoUAG-saecdO4",
  authDomain: "evento-386813.firebaseapp.com",
  projectId: "evento-386813",
  storageBucket: "evento-386813.appspot.com",
  messagingSenderId: "17807023590",
  appId: "1:17807023590:web:7bccd5f65869c34e980a27",
  measurementId: "G-HGHZQH5H6Q"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth,provider};