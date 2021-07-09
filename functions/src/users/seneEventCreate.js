import * as functions from "firebase-functions";
import { createEvent } from "./createEvent";
const admin = require("firebase-admin");
import moment from "moment";
admin.initializeApp();
const db = admin.firestore();
import { v4 as uuid_v4 } from "uuid";
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
    const startToSend = moment(data.start).format("MMM Do YY");

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
    try {
      await db
        .doc(`notification_sent/${selectedcategory}`)
        .get()
        .then(async (doc) => {
          let docArray = await doc.data().emails;

          if (docArray.length < 1) {
            return;
          } else {
            const email = await docArray.toString();
            await sendNotificationEmail(
              email,
              selectedcategory,
              displayname,
              startToSend,
              description
            );
            try {
              const arrTosend = email.split(",");

              const userRef = db.collection("user_aditional");
              const promises = arrTosend.map((item) =>
                userRef.where("email", "==", item).get()
              );
              return Promise.all(promises).then((docs) => {
                docs.forEach((el) => {
                  el.forEach(async (i) => {
                    const id = i.id;
                    await db
                      .collection("notifications")
                      .doc(id)
                      .get()
                      .then((doc) => {
                        if (doc.exists) {
                          return db.doc(`notifications/${id}`).update({
                            unread: admin.firestore.FieldValue.arrayUnion({
                              id: uuid_v4(),
                              created_at: Date.now(),
                              text: [
                                `New Eventlinny event has been added from the category : ${selectedcategory}`,
                                `You can view the event here
                              http://localhost:3000/events/${docId}
                              `,
                              ],
                            }),
                          });
                        } else {
                          return db.doc(`notifications/${id}`).set({
                            unread: [
                              {
                                id: uuid_v4(),
                                created_at: Date.now(),
                                text: [
                                  `New Eventlinny event has been added from the category : ${selectedcategory}`,
                                  `You can view the event here
                                http://localhost:3000/events/${docId}
                                `,
                                ],
                              },
                            ],
                          });
                        }
                      });
                  });
                });
              });
            } catch (err) {
              functions.logger.log(err);
            }
          }
        });
    } catch (err) {
      functions.logger.log(err);
    }
  });
