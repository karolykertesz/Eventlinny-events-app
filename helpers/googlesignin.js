import FirebaseClient from "../helpers/firebase";
import firebase from "firebase/app";
import "firebase/auth";
import validate from "../pages/api/users/validate";

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
    .catch((err) => console.log(err));
};
export default googleSign(async function (id, userId) {
  const valUrl = await validate(userId);
  const url = !valUrl ? "/startup" : "/events/first";
  console.log(url);
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
  window.location.href = `${url}`;
});
