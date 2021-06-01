/* eslint-disable */
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  secure: false,
  port: 587,
  auth: {
    user: process.env.NEXT_PUBLIC_NODE_EMAIL,
    pass: process.env.NEXT_PUBLIC_NODE_PASS,
  },
});
const handlebarOptions = {
  viewEngine: {
    extName: ".hbs",
    partialsDir: "./views",
    layoutsDir: "./views",
    defaultLayout: "main.hbs",
  },
  viewPath: "./views/",
  extName: ".hbs",
};
transporter.use("compile", hbs(handlebarOptions));
export const sender = async (email, firstname) => {
  let info = await transporter
    .sendMail({
      from: process.env.NEXT_PUBLIC_NODE_EMAIL,
      to: email,
      subject: "Thank You",
      template: "main",
      text: "hh",
      context: { from: "Eventlinny", name: firstname },
    })
    .then(() => {
      console.log("sent");
    });
};
