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

export const sendPassword = functions.https.onCall((data, context) => {
  const email = data.email;
  const password = data.link;
  const room = data.room;
  const mailOptions = {
    from: "node-test-kertesz@outlook.com",
    to: email,
    subject: "Thank You have Been Verified",
    html: `<h2>Your Password: ${password}</h2>
    <h2>Your Room Name: ${room}</h2>
    <p>Your Link to Chat will be in Your Notification</p>
    <p>Thank you for using Eventlinny!!!</p>
    `,
  };
  functions.logger.log(link);
  return transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      functions.logger.log(err);
    }
  });
});
