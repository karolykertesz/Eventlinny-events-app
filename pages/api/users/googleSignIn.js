const jwt = require("jsonwebtoken");
const cookie = require("cookie");

export default async function handler(req, res) {
  const userId = req.body.uid;
  if (!userId) {
    res.status(400).json({ m: "no uid" });
    return;
  }
  const secret = process.env.SECRET;
  const token = jwt.sign({ data: userId }, secret, {
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
  res.status(200).json({ message: "All set" });
  return;
}
