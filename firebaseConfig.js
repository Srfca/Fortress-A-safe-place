import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAgAtRRYHSTRXrLnYoycA1DcckjsuUN_8E",
  authDomain: "mobileapp-3d1a5.firebaseapp.com",
  databaseURL: "https://mobileapp-3d1a5-default-rtdb.firebaseio.com/",
  projectId: "mobileapp-3d1a5",
  storageBucket: "mobileapp-3d1a5.firebasestorage.app",
  messagingSenderId: "972129971350",
  appId: "1:972129971350:web:30e0b84462c1272517e6b7",
  measurementId: "G-T548093LXZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const rtdb = getDatabase(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, auth, db, rtdb };

