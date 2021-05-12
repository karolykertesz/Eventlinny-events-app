import firebase from "firebase";
import react from "react";

export default function FirebaseClient() {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: process.env.NEXT_PUBLIC_firebase_api_key,
      // process.env.FIREBASE_API_KEY
      authDomain: process.env.NEXT_PUBLIC_firebase_auth_domain,
      databaseURL: process.env.FIREBASE_DB_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: "next-events-309cd.appspot.com",
      messagingSenderId: process.env.FIREBASE_MASSAGE_ID,
      appId: process.env.FIREBASE_APP_ID,
    });
  }
}
