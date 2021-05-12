import FirebaseClient from "../helpers/firebase";
import firebase from "firebase/app";
import "firebase/auth";

const facebookSignIn = (fn) => async () => {
  FirebaseClient();
  const provider = new firebase.auth.FacebookAuthProvider();
  await provider.addScope("user_birthday");
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      const id = result.credential.accessToken;
      console.log(id);
      return fn(id);
    })
    .then(() => {
      window.location.href = "/startup";
    })
    .catch((err) => {
      console.log(err, "the error");
      const message = err.message;
      console.log(message);
      return;
    });
};

export default facebookSignIn(async function (id) {
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
