import firebase from "firebase";
import cookie from "cookie";
const handler = (fn) => async (req, res) => {
  await firebase
    .auth()
    .signOut()
    .then(
      function () {
        console.log("loged out");
      },
      function (error) {
        console.log("not signed out");
      }
    )
    .catch((err) => console.error("Sign Out Error", err));
  return fn(req, res);
};

export default handler(async function logout(req, res) {
  await res.setHeader(
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
