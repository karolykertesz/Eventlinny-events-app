import * as functions from "firebase-functions";

export const onUpdate = functions.firestore
  .document("private_chat/{docId}")
  .onUpdate((change, context) => {
    const data = change.after.data();
    const previousData = change.before.data();
    functions.logger.log(data, "data");
    functions.logger.log(previousData, "prev");
  });
