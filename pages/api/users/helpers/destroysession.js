import cookie from "cookie";
const destroysession = async (req, res) => {
  const session = req.cookies.session;
  if (session) {
    await res.setHeader(
      "Set-Cookie",
      cookie.serialize("session", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        path: "/",
        expires: new Date(0),
      })
    );
  }

  res.status(200).json({ m: "did" });
};

export default destroysession;
