import firebase from "firebase";
import cookie from "cookie";

const handler = (fn) => async (req, res) => {
  const userOut = await firebase.auth().signOut();
  return fn(req, res);
};

export default handler(async function logout(req, res) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("auth", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
    })
  );
  return res.status(200).json({ message: "user loged out" });
});
