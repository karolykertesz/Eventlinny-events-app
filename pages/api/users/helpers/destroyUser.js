import cookie from "cookie";
const destroy = async (req, res) => {
  await res.setHeader(
    "Set-Cookie",
    cookie.serialize("user", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
    })
  );
  res.status(200).json({ m: "did" });
  return;
};

export default destroy;
