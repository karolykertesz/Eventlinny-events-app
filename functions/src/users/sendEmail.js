import * as functions from "firebase-functions";
import { sender } from "./sender";

export const sendEmail = functions.https.onCall((data, context) => {
  const email = data.email;
  return sender(email);
});
