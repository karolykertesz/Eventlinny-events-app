import * as functions from "firebase-functions";
import { createEvent } from "./createEvent";
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
import { sendNotificationEmail } from "./sendNotificationEmails";
import { categories } from "./data";
export const sendCreate = functions.firestore
  .document("user_add_events/{docId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();
    const docId = context.params.docId;
    const email = data.user_email;
    const selectedcategory = data.category;
    const description = data.description;
    const displayname = data.created_by;
    const startToSend = new Date(data.start).toLocaleDateString();

    await createEvent(
      email,
      displayname,
      startToSend,
      selectedcategory,
      description
    );
    const findItem = await categories.find(
      (item) => item === selectedcategory.toString()
    );
    if (!findItem) {
      return;
    }
    await db
      .doc(`notification_sent/${selectedcategory}`)
      .get()
      .then(async (doc) => {
        let docArray = await doc.data().emails;

        if (docArray.length < 1) {
          return;
        } else {
          const email = await docArray.toString();
          sendNotificationEmail(
            email,
            selectedcategory,
            displayname,
            startToSend,
            description
          );
        }
      });
  });

// export const sendCreate = functions.onCreate(async (req, res) => {
//   cors(req, res, () => {
//     const {
//       email,
//       displayname,
//       startToSend,
//       selectedcategory,
//       docId,
//       description,
//     } = req.body;
//     return createEvent(
//       email,
//       displayname,
//       startToSend,
//       selectedcategory,
//       docId,
//       description
//     )
//       .then(() => {
//         res.json({ m: "all set" });
//       })
//       .catch((err) => console.log(err));
//   });
// });
