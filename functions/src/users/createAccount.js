import * as functions from "firebase-functions";

export const createaccount = functions.https.onRequest(async (req, res) => {
  const { newuserInfo } = req.body;
});
