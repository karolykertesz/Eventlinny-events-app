const jwt = require("jsonwebtoken");
import firebase from "firebase";
export const authChecker = async (req, res) => {
  const secret = process.env.SECRET;
  const token = req.cookies.auth;

  if (token === null || token === undefined)
    return res.status(403).json({ message: "No valid token" });

  try {
    await jwt.verify(token, secret, async function (err, decoded) {
      if (!err && decoded) {
        return res.status(200).json({ message: "user in" });
      }
    });
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

export default async function check(req, res) {
  return authChecker(req, res);
}

// export default authChecker(async function getUser(req, res) {
//   const user = await firebase.auth().currentUser;

//   if (user !== null) {
//     return res.status(200).json({
//       data: {
//         name: user.displayName,
//         email: user.email,
//         uid: user.uid,
//       },
//     });
//   }
//   return res.status(401).json({ data: "No user Signed in!!" });
// });
