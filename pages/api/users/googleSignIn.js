const jwt = require("jsonwebtoken");
import cookie from "cookie";
import firebase from "firebase";

export const handler = (fn) => async (req, res) => {
  const userId = "";
  try {
    const base_provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().useDeviceLanguage();
    await base_provider.setCustomParameters({
      login_hint: "user@example.com",
    });
    const sign = await firebase
      .auth()
      .signInWithRedirect(base_provider)
      .then((result) => {
        const credential = result.credential;
        const tok = credential.accessToken;
        userId += tok;
      });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Invalid Sign in" });
    return;
  }
  return fn(req, res, userId);
};

export default handler(async function gg(req, res, userId) {
  const token = jwt.sign({ data: userId }, process.env.SECRET, {
    expiresIn: "1h",
  });
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
      maxAge: 3600,
    })
  );
  res.status(200).json({ message: "All good" });
});
