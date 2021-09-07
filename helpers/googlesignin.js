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
    const status = mess.status;
    if (status !== 200) {
      return;
    }
  } catch (err) {
    console.log(err);
  }
  const dataRef = await firebase
    .firestore()
    .collection("user_aditional")
    .doc(uid);
  await dataRef.get().then((user) => {
    if (!user.exists || !user.data().pref_events) {
      return (window.location.href = "/startup");
    }
    return (window.location.href = "/events/first");
  });
});
