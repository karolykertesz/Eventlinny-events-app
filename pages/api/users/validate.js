const jwt = require("jsonwebtoken");
import firebase from "firebase";
export const authChecker = (fn) => async (req, res) => {
  const secret = process.env.SECRET;
  const token = req.cookies.auth;

  if (token === null || token === undefined)
    return res.status(403).json({ message: "No valid token" });

  try {
    await jwt.verify(token, secret, async function (err, decoded) {
      if (!err && decoded) {
        return fn(req, res);
      }
    });
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
export default authChecker(async function getUser(req, res) {
  const user = await firebase.auth().currentUser;

  if (user !== null) {
    return res.status(200).json({
      data: {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
      },
    });
  }
  return res.status(401).json({ data: "No user Signed in!!" });
});
