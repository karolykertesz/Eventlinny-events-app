import * as functions from "firebase-functions";
import admin from "firebase-admin";
const db = admin.firestore();

export const dailyDelete = functions.pubsub
  .schedule("* * * * *")
  .onRun(async (context) => {
    const publicRef = db.collection("public_chat");
    const bannedUsers = [];
    try {
      await db
        .collection("banned_users")
        .get()
        .then((docs) => {
          if (docs.size > 0) {
            docs.forEach((doc) => {
              const id = doc.id;
              bannedUsers.push(id);
            });
          } else {
            return;
          }
        });
      functions.logger.log(bannedUsers);
      const publicCollection = await db.collectionGroup("public_chat");

      await bannedUsers.map(async (item) => {
        const banned = await publicCollection.where("added_by", "==", item);
        await banned.get().then((docs) => {
          if (docs.size > 0) {
            functions.logger.log(docs.size);
            docs.forEach((dc) => {
              functions.logger.log(dc.data());
              publicRef
                .doc(dc.id)
                .delete()
                .then(() => {
                  functions.logger.log("deleted");
                });
            });
          }
        });
      });
    } catch (err) {
      functions.logger.log(err);
    }

    // await Promise.all(bannedUsers).then((docs) => {
    //   if (docs.length > 0) {
    //     docs.forEach((doc) => {
    //       const id = doc.id;
    //     });
    //   } else {
    //     return;
    //   }
    // });
  });
