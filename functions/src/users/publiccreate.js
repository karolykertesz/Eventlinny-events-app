import * as functions from "firebase-functions";
import admin from "firebase-admin";
const db = admin.firestore();
const Filter = require("bad-words");
export const publicCreate = functions.firestore
  .document("public_chat/{docId}/messages/{messageId}")
  .onCreate(async (snap, context) => {
    const { text, added_by } = snap.data();
    const filter = new Filter();
    if (filter.isProfane(text)) {
      try {
        const cleaned = filter.clean(text);
        await snap.ref.update({
          text: `Eventlinny doesn't tolerate offensive language: ${cleaned}`,
        });
        const userRef = await db.collection("user_aditional").doc(added_by);
        await userRef.get().then(async (doc) => {
          if (doc.data().banned_messages) {
            await userRef.update({
              banned_messages: admin.firestore.FieldValue.arrayUnion({
                user_said: text,
              }),
            });
            await db.collection("banned_users").doc(added_by).set({
              status: "banned",
            });
          } else {
            await userRef.update({
              banned_messages: admin.firestore.FieldValue.arrayUnion({
                user_said: text,
              }),
            });
          }
        });
      } catch (err) {
        functions.logger.log(err);
      }
    }
  });
