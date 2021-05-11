import cookie from "cookie";
const jwt = require("jsonwebtoken");
export default function handler(req, res) {
  const userId = req.body.userId;

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
