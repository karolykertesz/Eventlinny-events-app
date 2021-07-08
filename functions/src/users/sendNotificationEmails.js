const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
import { categoryImages } from "./data";
const handlebarOptions = {
  viewEngine: {
    extName: ".hbs",
    partialsDir: "./views",
    layoutsDir: "./views",
    defaultLayout: "sendNotis.hbs",
  },
  viewPath: "./views/",
  extName: ".hbs",
};
const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  secure: false,
  port: 587,
  auth: {
    user: "node-test-kertesz@outlook.com",
    pass: "Karika37",
  },
});
export const sendNotificationEmail = (
  email,
  selectedcategory,
  displayname,
  startToSend,
  description
) => {
  transporter.use("compile", hbs(handlebarOptions));
  const item = categoryImages.find((i) => i.name === selectedcategory);
  let source = item.src;
  return transporter
    .sendMail({
      from: "node-test-kertesz@outlook.com",
      to: email,
      subject: "Eventlinny Events Notification",
      template: "sendNotis",
      text: `Hi From Eventlinny, This is Notification email from selected category: ${selectedcategory}`,
      context: {
        from: "Eventlinny",
        start: startToSend,
        category: selectedcategory,
        image: source,
        description: description,
      },
    })
    .then(() => {
      console.log("sent");
    });
};
