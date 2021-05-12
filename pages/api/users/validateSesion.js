const jwt = require("jsonwebtoken");
const cookies = require("cookie");
const vdToken = async (req, res) => {
  const auth = req.cookies.auth;
  if (!auth) {
    res.status(400).json({ message: false });
    return;
  }
  try {
    const r = await jwt.verify(
      auth,
      process.env.SECRET,
      async function (err, decoded) {
        if (!err && decoded) {
          res.status(200).json({ message: true });
          return;
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(405).json({ message: "Invalid token" });
  }
};

export default vdToken;
