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

// const hbs = require("nodemailer-express-handlebars");
// import { categoryImages } from "./data";
// const handlebarOptions = {
//   viewEngine: {
//     extName: ".hbs",
//     partialsDir: "./views",
//     layoutsDir: "./views",
//     defaultLayout: "sendNotis.hbs",
//   },
//   viewPath: "./views/",
//   extName: ".hbs",
// };

// export default async function hander(req, res) {
//   cors(req, res, async () => {
//     const { startDate, eventName, email, displayname } = req.body;
//     try {
//       const mess = await fetch(
//         "http://localhost:5301/next-events-309cd/us-central1/sendCreate",
//         {
//           method: "POST",
//           body: JSON.stringify({
//             // startDate,
//             eventName,
//             email,
//             displayname,
//           }),
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//         }
//       );
//       const status = await mess.status;
//       console.log(status);
//       if (status < 350) {
//         res.status(200).json({ m: "email sent" });
//       } else {
//         res.status(500).json({ m: "error" });
//       }
//     } catch (err) {
//       throw new Error(err);
//     }
//   });
// }
