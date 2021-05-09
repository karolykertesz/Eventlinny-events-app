import { db, auth } from "../../../helpers/firebase";

const validate = require("validate.js");
import { constraints } from "../../../helpers/validators/login";
const jwt = require("jsonwebtoken");
import cookie from "cookie";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(500).json({
      message: "Wrong request",
    });
  }
  const email = req.body.email;
  const password = req.body.password;

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
  try {
    await auth.signInWithEmailAndPassword(email, password).then((userCred) => {
      const user = userCred.user;
      if (!user.emailVerified) {
        return res.status(400).json({ message: "Need to get verified" });
      }
      userId += user.uid;
    });
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return res.status(402).json({ message: errorMessage });
  }
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
}
