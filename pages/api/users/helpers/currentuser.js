const jwt = require("jsonwebtoken");
import cookie from "cookie";

export default async function getUser(req, res) {
  const userIn = req.body.user;
  if (!userIn) {
    res.status(403).json({ message: "invalid User credentials" });
    return;
  }
  const user = await jwt.sign(
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
  await res.setHeader(
    "Set-Cookie",
    cookie.serialize("user", user, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
      maxAge: 3600,
    })
  );

  res.status(200).json({ message: "good" });
  return;
}
