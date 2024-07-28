import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCtptiYdfp_IwFWTa4jV4ny-fkFPXkzpHc",
  authDomain: "dog-app-40f5d.firebaseapp.com",
  projectId: "dog-app-40f5d",
  storageBucket: "dog-app-40f5d.appspot.com",
  messagingSenderId: "642436354358",
  appId: "1:642436354358:web:68ff7504c60faf79aba397"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);

export { app, auth, db };