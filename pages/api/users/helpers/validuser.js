const jwt = require("jsonwebtoken");
export default async function validuser(req, res) {
  const userCookie = req.cookies.user;
  if (!userCookie) {
    res.status(400).json({ message: "Invalid user" });
    return;
  }
  let user = {};
  const v = await jwt.verify(
    userCookie,
    process.env.USER_SECRET,
    function (err, decoded) {
      if (!err && decoded) {
        const dt = decoded.data;
        user = { ...dt };
      } else {
        res.status(400).json({ message: "Invalid user" });
        return;
      }
    }
  );
  res.status(200).json({ message: user });
  return;
}
