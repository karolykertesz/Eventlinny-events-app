const jwt = require("jsonwebtoken");
const cookies = require("cookie");
const vdToken = async (req, res) => {
  const auth = req.cookies.auth;
  if (!auth) {
    return res.status(400).json({ message: false });
  }
  try {
    const r = await jwt.verify(
      auth,
      process.env.SECRET,
      async function (err, decoded) {
        if (!err && decoded) {
          return true;
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Invalid token" });
  }
  return res.status(200).json({ message: true });
};

export default vdToken;
