import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyBCQlKmqL3syIAOu0LwaTlk4lq-sIWGhpA',
    authDomain: 'phimke-beta.firebaseapp.com',
    projectId: 'phimke-beta',
    storageBucket: 'phimke-beta.appspot.com',
    messagingSenderId: '411134335309',
    appId: '1:411134335309:web:92bab71158c609ca3f3f04',
    measurementId: 'G-8W5P643X58',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { db, auth };
