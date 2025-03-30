import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCvgz2ZJaayUzFtuPXlHwRvnLWwYaXlbu0",
    authDomain: "orbah-ee6f9.firebaseapp.com",
    projectId: "orbah-ee6f9",
    storageBucket: "orbah-ee6f9.firebasestorage.app",
    messagingSenderId: "457413598158",
    appId: "1:457413598158:web:f1d17950d46d592322299f",
    measurementId: "G-3GE1TY8777"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);