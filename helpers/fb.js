import FirebaseClient from "../helpers/firebase";
import firebase from "firebase/app";
import "firebase/auth";
import { fbsignin } from "./firebase-hooks/get-fb-signIn";

const facebookSignIn = (fn) => async () => {
  FirebaseClient();
  const provider = new firebase.auth.FacebookAuthProvider();
  await provider.addScope("user_birthday");
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      const id = result.credential.accessToken;
      const email = result.user.email;
      return fn(email);
    })
    .catch((err) => {
      const code = err.code;
      if (code == "auth/account-exists-with-different-credential") {
        const pendingCred = err.credential;
        const email = err.email;
        firebase
          .auth()
          .fetchSignInMethodsForEmail(email)
          .then((methods) => {
            if (methods[0] === "password") {
              const password = prompt(
                `please enter your password used for ${email}`
              );
              firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((result) => {
                  return result.user.linkWithCredential(pendingCred);
                })
                .then(async () => {
                  // pendingCred.accessToken
                  const t = await fbsignin(email);
                })
                .catch((err) => {
                  throw new Error(err);
                });
            }
          });
      }
    });
};

export default facebookSignIn(async function (email) {
  const t = await fbsignin(email);
});
