// const cors = require("cors")({ origin: true });
import firebase from "firebase";
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  secure: false,
  port: 587,
  auth: {
    user: "node-test-kertesz@outlook.com",
    pass: "Karika37",
  },
});
export default async function handler(req, res) {
  const category = req.body.category;
  console.log(category, "ggg");
  try {
    const dataref = await firebase
      .firestore()
      .collection("notification_sent")
      .doc(category);
    await dataref.get().then(async (doc) => {
      if (doc.exists) {
        let daArray = await doc.data().emails;
        if (daArray.length > 0) {
          daArray = await daArray.toString();

          return transporter.sendMail({
            from: "node-test-kertesz@outlook.com",
            to: daArray,
            subject: "Eventlinny Events Notification",
            text: `Hi From Eventlinny,Notification email from selected category: ${category}`,
          });
        }
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
    return;
  }

  res.status(200).json({
    m: "ggg",
  });
}
