import { db, auth } from "../../../helpers/firebase";
import admin from "firebase-admin";
import firebase from "firebase";
const validate = require("validate.js");
import { constraints } from "../../../helpers/validators/login";
const jwt = require("jsonwebtoken");
import cookie from "cookie";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(500).json({
      message: "Wrong request",
    });
  }
  const email = req.body.email;
  const password = req.body.password;

  const value = await validate(
    {
      email,
      password,
    },
    constraints
  );
  if (value !== undefined) {
    return res.status(403).json({ message: "Something went wrong" });
  }

  let userId = "";
  try {
    await auth
      .signInWithEmailAndPassword(email, password)
      .then((userCred) => {
        const user = userCred.user;
        if (!user.emailVerified) {
          return res.status(400).json({ message: "Need to get verified" });
        }
        userId += user.uid;
      })
      .catch((err) => console.log(err));
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return res.status(402).json({ message: errorMessage });
  }
  const token = jwt.sign({ data: userId }, process.env.SECRET, {
    expiresIn: "1h",
  });
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
      maxAge: 3600,
    })
  );
  res.status(200).json({ message: "All good" });
}

// firebase
//   .auth()
//   .signInWithEmailAndPassword(email, password)
//   .then((user) => {
//     return user.getIdToken().then((idToken) => {
//       const token = idToken;
//       console.log(idToken, 'id token');
//       // next();
//       // return res.status(200).json({
//       //   firetoken: idToken,
//       //   csrfToken: req.csrfToken(),
//       //   message: 'all good',
//       // });
//     });
//   })
//   .catch((err) => console.log(err, 'hhhhhhhhhhh'));
//     console.log(tok);
//     return res.statusCode(200).json({ message: 'karalabe' });
//   });
// export default handler;

//  const handler = (fn) => async (req, res) => {
//   const { email, password } = req.body;
//   const value = validate({ email, password }, constraints);
//   if (value !== undefined) {
//     return;
//   }

//   const token = await firebase
//     .auth()
//     .setPersistence(firebase.auth.Auth.Persistence.NONE);
//   firebase
//     .auth()
//     .signInWithEmailAndPassword(email, password)
//     .then((user) => {
//       return user.getIdToken().then((idToken) => {
//         return idToken;
//       });
//     })
//     .catch((err) => console.log(err))}
//
//     return userCred.getIdToken().then(idToken=> {})
//     // let user = userCred.user;
//     // if (user && user.emailVerified) {
//     // let uid = user.uid;
//     // const uidToken = { uid: user.uid, firstname: user.firstname };
//     // const token = jwt.sign(uidToken, process.env.SECRET, {
//     //   expiresIn: '1h',
//     // });
//     //
//     /
//     return fn(req, res, uid);
//     // }
//     return res.status(400).json({ message: 'Email Needs to be Verified!' });
//   })
//   .catch((error) => {
//     let errorCode = error.code;
//     let errorMessage = error.message;
//     return res.status(500).json({ message: errorMessage });
//   });
// };

// export default handler(async function getToken(req, res, uid) {
//   try {
//     // const tokken = await admin
//     //   .auth()
//     //   .createCustomToken(uid)
//     //   .then((customToken) => {
//     //     return customToken;
//     //   })
//     //   .catch((err) => {
//     //     console.log(err, 'Token create');
//     //   });

//     return res.status(200).json({ tokken: tokken });
//   } catch (err) {
//     console.log(err);
//     return res.status(404).json({ message: 'Token was not created' });
//   }
// });

// // res.status(200).json({ message: 'Everithing is great' });
