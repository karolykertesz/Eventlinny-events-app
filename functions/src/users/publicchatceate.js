import * as functions from "firebase-functions";
import nodemailer from "nodemailer";
import admin from "firebase-admin";
const db = admin.firestore();
const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  secure: false,
  port: 587,
  auth: {
    user: "node-test-kertesz@outlook.com",
    pass: "Karika37",
  },
});
export const publicChat = functions.firestore
  .document("public_chat/{docId}")
  .onCreate(async (snap, context) => {
    let itemsToDelete = [];
    const data = snap.data();

    const mailOptions = {
      from: "node-test-kertesz@outlook.com",
      to: data.email,
      subject: "Eventlinny Public chat created",
      html: `<h1>Thank For Creating an Eventlinny Public Chat</h1>
      <p>Your Category  Name: ${data.category}</p>
      <p>Thank you for using Eventlinny!!!</p>
      `,
    };
    await transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        functions.logger.log(err);
      }
    });
    const docref = db.collection("public_chat");
    await docref.get().then((docs) => {
      docs.forEach((doc) => {
        const currentDate = Date.now();
        if (doc.data().last_user + 604800000 < currentDate) {
          itemsToDelete.push(doc.id);
        }
      });
    });
    if (itemsToDelete.length > 0) {
      await itemsToDelete.map((i) => docref.doc(i).delete());
    }
  });
