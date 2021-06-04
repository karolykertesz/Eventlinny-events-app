/* eslint-disable */
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

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

export const sender = async (email, firstname) => {
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

  return transporter
    .sendMail({
      from: "node-test-kertesz@outlook.com",
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
