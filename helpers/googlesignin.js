import firebase from "firebase/app";
import FirebaseClient from "../helpers/firebase";
import "firebase/auth";
const googleSign = (fn) => async () => {
  FirebaseClient();
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("profile");
  provider.addScope("email");
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      const id = result.credential.accessToken;
      const uid = result.user.uid;
      return fn(id, uid);
    })
    .catch((err) => console.log(err));
};
export default googleSign(async function (id, uid) {
  const urlLink = await fetch("api/users/googleValid", {
    method: "POST",
    body: {
      uid: uid,
    },
    headers: {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  });
  const url = await urlLink.json();
  const mess = await fetch("/api/users/googleSignIn", {
    method: "POST",
    body: {
      id: id,
    },
    headers: {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  });
  window.location.href = `${url.url}`;
});
