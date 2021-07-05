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
// import cors from "cors;";
export const sendVerif = functions.https.onCall((data, context) => {
  const email = data.email;
  const link = data.link;
  const room = data.room;
  const mailOptions = {
    from: "node-test-kertesz@outlook.com",
    to: email,
    subject:
      "Eventlinny private chat Has Been created And You have Been Invited",
    html: `<h1>You credentials to verify the email and get Your Password</h1>
    <p>Your Room Name: ${room}</p>
    <p>${link}</p>
    <p>Your password will b</p>
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
