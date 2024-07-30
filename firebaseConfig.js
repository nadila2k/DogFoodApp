import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDzDBVFGZSLUV150YM_e68pfqdpcqVSUkE",
  authDomain: "dog-food-app-c2334.firebaseapp.com",
  projectId: "dog-food-app-c2334",
  storageBucket: "dog-food-app-c2334.appspot.com",
  messagingSenderId: "332373077407",
  appId: "1:332373077407:web:94287e1bc4e9e08bfa61aa"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);

export { app, auth, db };