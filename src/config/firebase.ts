import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCobPFVGmEYT0m3miVZ6CLIhbhEiVHiIWA",
  authDomain: "humonix-26759.firebaseapp.com",
  projectId: "humonix-26759",
  storageBucket: "humonix-26759.firebasestorage.app",
  messagingSenderId: "1034549748908",
  appId: "1:1034549748908:web:ee3c1f09b21cd41ad22b09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;