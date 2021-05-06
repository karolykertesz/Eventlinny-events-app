import { db, auth } from '../../../helpers/firebase';
import admin from 'firebase-admin';
import firebase from 'firebase';
const validate = require('validate.js');
import { constraints } from '../../../helpers/validators/login';
const jwt = require('jsonwebtoken');
import cookie from 'cookie';
// const csrf = require('csurf');

// var cookieParser = require('cookie-parser');
// export const config = {
//   api: {
//     cookieParser: true,
//   },
// };

// export const config = {
//   api: {
//     cookieParser: true,
//   },
// };

// export function middleware(req, res, fn) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }
//       return resolve(result);
//     });
//   });
// }

export const handler = (fn) => async (req, res) => {
 

  return fn(req, res, token, secret);
};

export default handler(async function doToken(req, res, token, secret) {
  const { email, password } = req.body;
  console.log(secret);
  const value = validate({ email, password }, constraints);
  // await middleware(req, res, csrfProtection);

  if (value !== undefined) {
    return;
    55;
  }
  return res.status(200).json({ tokken: token });
});

// const handler = nc({
//   onError(req, res) {
//     res.status(501).json({ error: 'dd' });
//   },
//   next()
// })
//   // .use(csrfProtection)
//   .use((req, res, next) => {
//
//     next();
//     let tok = {};
// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
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
// auth
//   .signInWithEmailAndPassword(email, password)
//   .then((userCred) => {
//     if (!userCred) {
//       return res
//         .status(404)
//         .json({ message: 'Not a Valid user or password' });
//     }
//     return userCred.getIdToken().then(idToken=> {})
//     // let user = userCred.user;
//     // if (user && user.emailVerified) {
//     // let uid = user.uid;
//     // const uidToken = { uid: user.uid, firstname: user.firstname };
//     // const token = jwt.sign(uidToken, process.env.SECRET, {
//     //   expiresIn: '1h',
//     // });
//     //
//     // res.setHeader(
//     //   'Set-Cookie',
//     //   cookie.serialize('auth', token, {
//     //     httpOnly: true,
//     //     secure: process.env.NODE_ENV !== 'development',
//     //     sameSite: 'strict',
//     //     path: '/',
//     //     maxAge: 3600,
//     //   })
//     // );
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
