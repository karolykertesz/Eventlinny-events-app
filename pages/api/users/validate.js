import firebase from 'firebase';
import admin from 'firebase-admin';
const jwt = require('jsonwebtoken');
import cookie from 'cookie';
export const authChecker = (fn) => async (req, res) => {
  const secret = process.env.SECRET;
  const token = req.cookies.auth;
  const fire = req.cookies.fire;
  if (token == null || fire == null)
    return res.status(403).json({ message: 'No valid token' });

  try {
    await jwt.verify(token, secret, async function (err, decoded) {
      if (!err && decoded) {
        return await fn(req, res, fire);
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'Invalid Token' });
  }
};

export default authChecker(async function getName(req, res, fire) {
  const user = await firebase.auth().currentUser;
  if (!user) return res.status(403).json({ massege: 'no User Signed in' });
  const uid = user.toJSON().uid;
  
  await admin
    .auth()
    .verifyIdToken(fire)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      console.log(uid);
    })
    .catch((err) => console.log(err));

  res.status(200).json({ message: 'Everithing is great' });
});

// console.log(user);

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
