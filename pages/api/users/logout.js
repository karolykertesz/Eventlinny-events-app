import cookie from "cookie";
import admin from "firebase-admin";
admin.initializeApp();

const handler = async (req, res) => {
  const { uid } = req.body;
  if (req.cookies.auth) {
    try {
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
    } catch (err) {
      res.status(204).json({ m: "no" });
    }

    return res.status(200).json({ m: "hh" });
  }
  return res.status(200).json({ m: "done" });
};
export default function withHandler(req, res) {
  return handler(req, res);
}
