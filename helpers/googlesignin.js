import firebase from "firebase";
const googleSign = (fn) => async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("profile");
  provider.addScope("email");
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(async function (result) {
      const uid = await result.user.uid;
      return fn(uid);
    })
    .catch((err) => console.log(err));
};
export default googleSign(async function (uid) {
  const urlLink = await fetch("api/users/googleValid", {
    method: "POST",
    body: JSON.stringify({
      uid: uid,
    }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const url = await urlLink.json();

  try {
    const mess = await fetch("/api/users/googleSignIn", {
      method: "POST",
      body: JSON.stringify({
        uid: uid,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const status = await mess.status;
    if (status !== 200) {
      return;
    }
  } catch (err) {
    console.log(err);
  }

  window.location.href = `${url.url}`;
});
