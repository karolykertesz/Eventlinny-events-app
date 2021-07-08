import * as functions from "firebase-functions";
import { createEvent } from "./createEvent";
const admin = require("firebase-admin");
admin.initializeApp();
export const sendCreate = functions.firestore
  .document("user_add_events/{docId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();
    console.log(data);
    const docId = context.params.docId;
    const email = data.user_email;
    const selectedcategory = data.category;
    const description = data.description;
    const displayname = data.created_by;
    const startToSend = new Date(data.starts).valueOf();
    functions.logger.log(data);
    return await createEvent(
      email,
      displayname,
      startToSend,
      selectedcategory,
      docId,
      description
    );
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
