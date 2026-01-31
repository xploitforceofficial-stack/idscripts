
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvTJpGmUscjWIa3WJTU8MgATkiasY4Yag",
  authDomain: "idscript-b608d.firebaseapp.com",
  databaseURL: "https://idscript-b608d-default-rtdb.firebaseio.com",
  projectId: "idscript-b608d",
  storageBucket: "idscript-b608d.firebasestorage.app",
  messagingSenderId: "63820106130",
  appId: "1:63820106130:web:b6eb4098a07bdba6ab194b",
  measurementId: "G-38HC04SHG8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};
