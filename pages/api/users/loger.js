import firebase from "firebase";
const validate = require("validate.js");
import { constraints } from "../../../helpers/validators/login";
const jwt = require("jsonwebtoken");
import cookie from "cookie";
import validateUrl from "./validate";

async function loger(req, res, email, password) {
  if (req.method !== "POST") {
    return res.status(500).json({
      message: "Wrong request",
    });
  }
  const value = await validate(
    {
      email,
      password,
    },
    constraints
  );
  if (value !== undefined) {
    return res.status(403).json({ message: "Something went wrong" });
  }

  let userId = "";
  let userObj = {};
  try {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCred) => {
        const user = userCred.user;
        if (!user.emailVerified) {
          return res.status(400).json({ message: "Need to get verified" });
        }
        userId += user.uid;
        userObj = {
          ...userObj,
          name: user.displayName,
          email: user.email,
          uid: user.uid,
        };
      });
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return res.status(402).json({ message: errorMessage });
  }
  const token = await jwt.sign({ data: userId }, process.env.SECRET, {
    expiresIn: "1h",
  });

  const urlvalue = await validateUrl(userId);
  const url = !urlvalue ? "/events/first" : "/startup";

  await res.setHeader(
    "Set-Cookie",
    cookie.serialize("auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
      maxAge: 3600,
    })
  );

  res.status(200).json({ message: url, userObj: userObj });
  return;
}

export default loger;
