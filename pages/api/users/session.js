const jwt = require("jsonwebtoken");
import cookie from "cookie";
const Tokens = require("csrf");
const tokens = new Tokens();
const secret = tokens.secretSync();
const token = tokens.create(secret);
import loger from "./loger";
import sander from "./createsession";
import { checkOut, createCookie } from "./createsession";
const handler = async (req, res) => {
  if (req.method === "GET") {
    const t = await checkOut(req, res, token, secret, createCookie);
  }

  if (req.method === "POST") {
    if (!req.body.token || !req.cookies.session) {
      return res.status(401).json({ message: "Please refresh the page" });
    }
    const session = req.cookies.session;
    const tokenI = req.body.token;
    const email = req.body.email;
    const password = req.body.password;
    let sec = "";
    try {
      const r = await jwt.verify(
        session,
        process.env.SESSION_SECRET,
        async function (err, decoded) {
          if (!err && decoded) {
            const d = await decoded.data;
            sec += d;
          }
        }
      );
    } catch (err) {
      res.status(405).json({ message: "Please refresh the browser" });
      return;
    }
    try {
      if ((sec, tokenI)) {
        if (!tokens.verify(sec, tokenI)) {
          res.status(405).json({ message: "Something went wrong" });
          return;
        } else {
          return loger(req, res, email, password);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
};

export default function withSession(req, res) {
  return handler(req, res);
}
