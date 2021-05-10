const Tokens = require("csrf");
const jwt = require("jsonwebtoken");
import cookie from "cookie";
const tokens = new Tokens();
const secret = tokens.secretSync();
const token = tokens.create(secret);
export default async function handler(req, res) {
  if (req.method === "GET" && !req.cookies.session) {
    const tokenC = jwt.sign({ data: secret }, process.env.SESSION_SECRET, {
      expiresIn: 100,
    });
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("session", tokenC, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        path: "/",
        maxAge: 100,
      })
    );
    return res.status(200).json({ token: token });
  }
  if (req.method === "GET" && req.cookies.auth) {
    return res.status(201).json({ message: "already" });
  }
  // if (req.method === "GET" && !req.cookies.auth && req.cookies.session) {
  //   res.status(200).json({ message: "k" });
  // }
  if (req.method === "POST") {
    if (!req.body.token || !req.cookies.session) {
      return res.status(401).json({ message: "Please refresh the page" });
    }
    const session = req.cookies.session;
    const token = req.body.token;
    let secret = "";
    try {
      const r = await jwt.verify(
        session,
        process.env.SESSION_SECRET,
        async function (err, decoded) {
          if (!err && decoded) {
            secret += decoded.data;
          }
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(405).json({ message: "Please refresh the browser" });
    }
    try {
      if (!tokens.verify(secret, token)) {
        return res.status(400).json({ message: "Something went wrong" });
      }
    } catch (err) {
      console.log(err);
    }
    return res.status(200).json({ message: "all Good" });
  }
}
