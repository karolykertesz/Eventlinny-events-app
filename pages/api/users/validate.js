import { db, adminAuth } from '../../../helpers/firebase';
import firebase from 'firebase';
const jwt = require('jsonwebtoken');

export const authChecker = (fn) => async (req, res) => {
  const secret = process.env.SECRET;
  const token = req.cookies.auth;
  if (token == null) return res.status(403).json({ message: 'No valid token' });

  try {
    await jwt.verify(token, secret, async function (err, decoded) {
      if (!err && decoded) {
        const t = decoded.uid;
        return await fn(req, res, t);
      }
    });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
};

export default authChecker(async function getName(req, res, t) {
  console.log(t);
  const user = firebase.auth().currentUser.toJSON();
  firebase.auth().onAuthStateChanged((fbUser) => {
    if (fbUser) {
      console.log(fbUser.toJSON());
    }
  });
  // console.log(user);
  res.json({ m: 'jj' });
});

//   const coc = req.cookies.auth;
//   const dd = await jwt.verify(token, secret, (err, decoded) => {
//     if (!err && decoded) {
//       return true;
//     } else {
//       return false;
//     }
//   });
//   console.log(payload);

//   try {
//     const value = await verify(token, secret, async function (err, decoded) {
//       if (!err && decoded) {
//         res.json(decoded);
//         //   await auth.currentUser
//         //     .getIdToken(true)
//         //     .then(function (idToken) {
//         //       return res.status(200).json({ message: decoded });
//         //     })
//         //     .catch((err) => console.log(err));
//       }
//     });
//   } catch (err) {
//     res.json(err);
//   }
