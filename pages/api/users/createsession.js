const jwt = require("jsonwebtoken");
import cookie from "cookie";
export const createCookie = async (req, res, token, secret) => {
  const tokenC = await jwt.sign({ data: secret }, process.env.SESSION_SECRET, {
    expiresIn: 300,
  });
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("session", tokenC, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
      maxAge: 300,
    })
  );
  res.status(200).json({ token: token });
  return;
};

export const checkOut = async (req, res, token, secret, fn) => {
  if (req.cookies.session) {
    await res.setHeader(
      "Set-Cookie",
      cookie.serialize("auth", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        path: "/",
        expires: new Date(0),
      })
    );
    return fn(req, res, token, secret);
  } else {
    return fn(req, res, token, secret);
  }
};
