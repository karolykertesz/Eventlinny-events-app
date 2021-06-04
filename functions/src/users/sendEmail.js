import * as functions from "firebase-functions";
import { sender } from "./sender";
import { createEvent } from "./createEvent";

export const sendEmail = functions.https.onRequest(async (req, res) => {
  const { email, firstname } = req.body;
  return sender(email, firstname)
    .then(() => {
      res.json({ m: "done" });
    })
    .catch((err) => {
      console.log(err);
    });
});

export const sendCreate = functions.https.onRequest(async (req, res) => {
  const { startDate, eventName, email, displayname } = req.body;
  return createEvent(startDate, eventName, email, displayname)
    .then(() => {
      res.json({ m: "all set" });
    })
    .catch((err) => console.log(err));
});
