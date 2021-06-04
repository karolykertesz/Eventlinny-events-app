import * as functions from "firebase-functions";
import { sender } from "./sender";
const cors = require("cors")({ origin: true });

export const sendEmail = functions.https.onRequest(async (req, res) => {
  cors(req, res, () => {
    const { email, firstname } = req.body;
    return sender(email, firstname)
      .then(() => {
        res.json({ m: "done" });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
