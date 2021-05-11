import firebase from "firebase";
const handler = async () => {
  const userId = "";
  try {
    provider.addScope("profile");
    provider.addScope("email");
    await firebase.auth().useDeviceLanguage();
    await provider.setCustomParameters({
      login_hint: "user@example.com",
    });

    const sign = await firebase
      .auth()
      .signInWithPopup(providerr)
      .then((result) => {
        console.log(result);
        const credential = result.credential;
        const tok = credential.accessToken;
        userId += tok;
      });
  } catch (err) {
    console.log(err);
    // return;
  }
  console.log(userId);
  // return userId;
};
export default async function goo(handler) {
  return handler;
}
