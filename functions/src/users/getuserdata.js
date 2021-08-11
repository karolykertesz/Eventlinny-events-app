import * as functions from "firebase-functions";
import admin from "firebase-admin";
const cors = require("cors");
export const getuserData = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("Failed to authenticate");
  }
  const id = data.uid;
  let user = {};
  await admin
    .auth()
    .getUser(id)
    .then((us) => {
      user = { ...us.metadata.toJSON() };
    });
  return { user, code: 200 };
});
