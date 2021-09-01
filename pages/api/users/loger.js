const jwt = require("jsonwebtoken");
import cookie from "cookie";
import validateUrl from "./validate";

async function loger(req, res, uid) {
  if (req.method !== "POST") {
    return res.status(500).json({
      message: "Wrong request",
    });
  }

  let userId = uid;

  const token = await jwt.sign({ data: userId }, process.env.SECRET, {
    expiresIn: "1h",
  });

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

  return res.status(200).json({ message: "All ok" });
}

export default loger;
