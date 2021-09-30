import firebase from "firebase";
const validate = require("validate.js");
const auth = firebase.auth();
import { constraints } from "../../../helpers/validators/signup";
export default async function handler(req, res) {
  const { firstname, lastname, email, password } = req.body;
  const value = await validate(
    { firstname, lastname, email, password },
    constraints
  );
  if (value !== undefined) {
    res.status(403).json({ message: value });
    return;
  }
  const actionCodeSettings = {
    url: `https://eventlinny.vercel.app/users/vid/?email=${email}`,
  };
  try {
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAcc) => {
        userAcc.user.sendEmailVerification(actionCodeSettings);
        userAcc.user.updateProfile({ displayName: firstname });
      });
  } catch (err) {
    var errorCode = err.code;
    var errorMessage = err.message;
    return res.status(400).json({ message: errorMessage });
  }
  return res.status(200).json({
    message:
      "Email Verification has been sent,plese check your spam folder,too!",
  });
}
