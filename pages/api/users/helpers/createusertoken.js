const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");
import cookie from "cookie";
import { fireAdmin } from "../../../../helpers/firebaseAdmin";
fireAdmin();
export default async function createuseroken(req, res) {
  const userId = req.body.uid;
  let user = {};

  const ad = await admin
    .auth()
    .getUser(userId)
    .then(async (userRec) => {
      user = await {
        name: userRec.displayName,
        uid: userRec.uid,
        email: userRec.email,
      };
    })
    .then(() => {
      console.log(user);
    })
    .catch((err) => {
      console.log(err);
    });
  const userIn = user;
  const usertoken = await jwt.sign(
    {
      data: {
        userIn,
      },
    },
    process.env.USER_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return new Promise((resolve, reject) => {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("user", user, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        path: "/",
        maxAge: 3600,
      })
    );
  }).then(() => {
    // res.status(200);
  });
}
