import firebase from 'firebase';


if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: 'next-events-309cd.appspot.com',
    messagingSenderId: process.env.FIREBASE_MASSAGE_ID,
    appId: process.env.FIREBASE_APP_ID,
  });
}

export const db = firebase.firestore();

