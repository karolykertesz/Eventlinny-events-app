import * as functions from "firebase-functions";
const cors = require("cors")({ origin: true });
import { createEvent } from "./createEvent";

export const sendCreate = functions.https.onRequest(async (req, res) => {
  cors(req, res, () => {
    const {
      email,
      displayname,
      startToSend,
      selectedcategory,
      docId,
      description,
    } = req.body;
    return createEvent(
      email,
      displayname,
      startToSend,
      selectedcategory,
      docId,
      description
    )
      .then(() => {
        res.json({ m: "all set" });
      })
      .catch((err) => console.log(err));
  });
});
