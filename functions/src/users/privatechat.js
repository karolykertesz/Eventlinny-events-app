import * as functions from "firebase-functions";
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  secure: false,
  port: 587,
  auth: {
    user: "node-test-kertesz@outlook.com",
    pass: "Karika37",
  },
});
export const privateChat = functions.firestore
  .document("private_chat/{docId}")
  .onCreate((snap, context) => {
    const data = snap.data();
    const docName = context.params.docId;

    const mailOptions = {
      from: "node-test-kertesz@outlook.com",
      to: data.host,
      subject: "Eventlinny private chat created",
      html: `<h1>Thank For Creating an Eventlinny Private Chat</h1>
      <p>Your Room Name: ${docName}</p>
      <p>Your Password: ${data.password}</p>
      <p>The Private Chat option can be seen in "your chats" menu as, well in your notifications!!</p>
      <p>Thank you for using Eventlinny!!!</p>
      `,
    };
    return transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        functions.logger.log(err);
      }
    });
  });
