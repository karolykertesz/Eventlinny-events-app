const jwt = require("jsonwebtoken");
const cookie = require("cookie");

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const { email } = req.body;
      const secret = process.env.SECRET;
      const token = jwt.sign({ data: email }, secret, {
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
      return res.status(200).json({ message: "All set" });
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(405).json({ m: "Wrong request" });
  }
}
