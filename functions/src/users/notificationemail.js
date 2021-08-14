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

export const notificationEmail = functions.https.onCall((data, context) => {
  if (!context.auth) {
    return;
  }
  const reciverEmail = data.email;
  const sender = data.sender;
  const reciver = data.receiver;
  const mailOptions = {
    from: "node-test-kertesz@outlook.com",
    to: reciverEmail,
    subject: "New Eventlinny Message",
    html: `<h2>Hi ${reciver} , This is carlo from Eventlinny</h2>
    <p>Your Received a message from ${sender}</p>
    <p>Please check Your messages under Your Profile</p>
    `,
  };

  return transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      functions.logger.log(err);
    }
  });
});
