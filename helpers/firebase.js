import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyB4F8VHK-E3VCcWzRcXpfIh5tGpHFuAKTA",
  authDomain: "next-events-309cd.firebaseapp.com",
  databaseURL: "https://next-events-309cd-default-rtdb.firebaseio.com",
  projectId: "next-events-309cd",
  storageBucket: "next-events-309cd.appspot.com",
  messagingSenderId: "633929560716",
  appId: "1:633929560716:web:4d255f99cfd439139fc1a9",
};

export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
