import * as functions from "firebase-functions";
import { sender } from "./sender";

export const sendEmail = functions.https.onRequest(async (req, res) => {
  const { email, firstname } = req.body;
  return sender(email, firstname).then(() => {
    res.json({ m: "done" });
  });
});
