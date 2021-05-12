import FirebaseClient from "../helpers/firebase";
import firebase from "firebase/app";
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
      return fn(id);
    })
    .then(() => {
      window.location.href = "/startup";
    })
    .catch((err) => console.log(err));
};
export default googleSign(async function (id) {
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
  const data = await mess.json();
  console.log(data);
});
