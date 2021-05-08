const jwt = require("jsonwebtoken");
export const vdToken = (fn) => async (req, res, tokens) => {
  const session = req.cookies.session;
  const token = req.body.token;
  console.log(session);
  try {
    const r = await jwt.verify(
      session,
      process.env.SESSION_SECRET,
      async function (err, decoded) {
        if (!err && decoded) {
          // secret = decoded.data;
          console.log(decoded);
          console.log(decoded.data);
          return await fn(req, res);
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(405).json({ message: "Invalid token" });
  }
  // try {
  //   if (!tokens.verify(secret, JSON.stringify(token))) {
  //     res.status(400).json({ message: "Somethin went wrong" });
  //   }
  //   return;
  // } catch (err) {
  //   console.log(err);
  // }
  console.log(secret, "the secret");
};
