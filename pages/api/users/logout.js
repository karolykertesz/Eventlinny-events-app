import firebase from "firebase";
import cookie from "cookie";

const handler = async (req, res) => {
  if (req.cookies.auth && !req.cookies.user) {
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
    return res.status(200).json({ m: "hh" });
  }
};
export default function withHandler(req, res) {
  return handler(req, res);
}
