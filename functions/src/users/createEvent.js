const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
import { categoryImages } from "./data";

const handlebarOptions = {
  viewEngine: {
    extName: ".hbs",
    partialsDir: "./views",
    layoutsDir: "./views",
    defaultLayout: "crEvent.hbs",
  },
  viewPath: "./views/",
  extName: ".hbs",
};
export const createEvent = async (
  email,
  displayname,
  startToSend,
  selectedcategory,
  description,
  meeeting_starts,
  id,
  t
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secure: false,
    port: 587,
    auth: {
      user: "node-test-kertesz@outlook.com",
      pass: "Karika37",
    },
  });
  transporter.use("compile", hbs(handlebarOptions));
  selectedcategory;
  let source;
  const oneItem = await categoryImages.find(
    (item) => item.name === selectedcategory.toString()
  );
  if (oneItem) {
    source = oneItem.src;
  }
  if (!oneItem) {
    const secItem = await categoryImages.find((i) => i.name === "create");
    source = secItem.src;
  }
  return transporter
    .sendMail({
      from: "node-test-kertesz@outlook.com",
      to: email,
      subject: "Eventlinny Event created",
      template: "crEvent",
      text: `Hi ${displayname} thank You for Adding Your Eventlinny event!!`,
      context: {
        from: "Eventlinny",
        name: displayname,
        start: startToSend,
        event: selectedcategory,
        image: source,
        eventName: description,
        meeting_id: id,
        meeeting_starts,
        url: `https://eventlinny.vercel.app/views/${t}`,
      },
    })

    .then(() => {
      console.log("sent");
    })
    .catch((err) => {
      console.log(err);
    });
};
