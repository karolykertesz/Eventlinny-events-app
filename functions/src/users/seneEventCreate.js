import * as functions from "firebase-functions";
const cors = require("cors")({ origin: true });
import { createEvent } from "./createEvent";

export const sendCreate = functions.https.onRequest(async (req, res) => {
  cors(req, res, () => {
    const { startDate, eventName, email, displayname } = req.body;
    return createEvent(startDate, eventName, email, displayname)
      .then(() => {
        res.json({ m: "all set" });
      })
      .catch((err) => console.log(err));
  });
});
