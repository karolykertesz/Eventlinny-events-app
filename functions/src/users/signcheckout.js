import * as functions from "firebase-functions";
import admin from "firebase-admin";
const db = admin.firestore();
export const signCheckOut = functions.https.onCall(async (data, context) => {
  const uid = context.auth.uid;
  functions.logger.log(uid);
  const public_ref = db.collection("public_chat");
  const private_ref = db.collection("private_chat");
  try {
    await public_ref
      .where("active_users", "array-contains", uid)
      .get()
      .then((docs) => {
        docs.forEach(async (doc) => {
          const id = doc.id;
          await public_ref.doc(id).update({
            active_users: admin.firestore.FieldValue.arrayRemove(uid),
          });
        });
      });
  } catch (err) {
    functions.logger.log(err);
  }
  try {
    await private_ref
      .where("active_users", "array-contains", uid)
      .get()
      .then(async (docs) => {
        await docs.forEach((doc) => {
          const id = doc.id;
          private_ref.doc(id).update({
            active_users: admin.firestore.FieldValue.arrayRemove(uid),
          });
        });
      });
  } catch (err) {
    functions.logger.log(err);
  }
});
