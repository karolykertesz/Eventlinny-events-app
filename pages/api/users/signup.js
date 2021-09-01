const bcrypt = require("bcrypt");
const saltRounds = 10;
import { db } from "../../../helpers/firebase";
const { v4: uuidv4 } = require("uuid");

const validate = require("validate.js");
import { constraints } from "../../../helpers/validators/signup";
export default async function handler(req, res) {
  const { firstname, lastname, email, password } = req.body;

  const value = await validate(
    {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    },
    constraints
  );
  if (value !== undefined) {
    res.status(403).json({
      message: {
        error: value,
      },
    });
    return;
  }

  const salt = await bcrypt.genSaltSync(saltRounds);
  const hashpass = await bcrypt.hashSync(password, salt);
  let emailExist = [];
  try {
    const dt = await db
      .collection("users")
      .where("email", "==", `${email}`)
      .get()
      .then((snapshot) => {
        snapshot.forEach((i) => {
          emailExist.push(i.id);
        });
      });
    if (emailExist.length > 0) {
      return res.status(400).json({ message: "error" });
    }
  } catch (err) {
    console.log("Error getting documents: ", err);
  }

  try {
    const dt = await db
      .collection("users")
      .add({
        firstname,
        lastname,
        email,
        password: hashpass,
        vid: uuidv4(),
        isValidated: false,
      })
      .then((docId) => {
        res
          .status(200)
          .json({ message: { id: docId.id, lastname, firstname } });
      });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: err });
  }
}
