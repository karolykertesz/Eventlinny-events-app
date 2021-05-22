const admin = require("firebase-admin");
import { AuthM } from "../../../../helpers/firebaseAdmin";

export default async function cuurrentuser(req, res) {
  //   fireAdmin();
  const uid = req.body.uid;
  const user = await AuthM(uid).then((ii) => {
    console.log(ii);
  });

  //   let userObj = {};
  //   try {
  //     await admin
  //       .auth()
  //       .getUser(uid)
  //       .then(async (userRec) => {
  //         const us = await userRec;
  //         userObj = { ...us };
  //       })
  //       .catch((err) => {
  //         throw new Error(err);
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  res.status(200).json({ m: user });
  return;
}
