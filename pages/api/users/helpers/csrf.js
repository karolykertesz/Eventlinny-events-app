const Tokens = require("csrf");
const tokens = new Tokens();
const secret = tokens.secretSync();
const token = tokens.create(secret);

const handler = async (req, res) => {
  if (req.method === "GET") {
    return res.status(200).json({
      secret: secret,
    });
  }
  if (req.method === "POST") {
    const secretI = req.body.secret;
    if (!tokens.verify(secretI, token)) {
      return res.status(400).json({ message: "invalid token" });
    } else {
      return res.status(200).json({ message: "all good" });
    }
  }
};
export default handler;
