import { initializeApp } from "firebase/app";
import { getFirestore,collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOI8lnjQrTdSJ_omw0uj3dYpDlS4eBZEk",
  authDomain: "animeverse-a99df.firebaseapp.com",
  projectId: "animeverse-a99df",
  storageBucket: "animeverse-a99df.appspot.com",
  messagingSenderId: "206857106884",
  appId: "1:206857106884:web:9fe5459ee75b19ab4c2091"
};

const app = initializeApp(firebaseConfig);
export const db= getFirestore(app)
export const animeref= collection(db, "anime")
export const reviewref= collection(db, "reviews")
export const usersref= collection(db, "users")
export default app;