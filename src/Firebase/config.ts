import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: 'AIzaSyBCQlKmqL3syIAOu0LwaTlk4lq-sIWGhpA',
    authDomain: 'phimke-beta.firebaseapp.com',
    projectId: 'phimke-beta',
    storageBucket: 'phimke-beta.appspot.com',
    messagingSenderId: process.env.REACT_APP_SENDER_Id,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: 'G-8W5P643X58',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
getAnalytics();

export { db, auth };
