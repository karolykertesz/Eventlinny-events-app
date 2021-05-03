import { db, auth } from '../../../helpers/firebase';
const jwt = require('jsonwebtoken');

async function authChecker(req, res, next) {
  const secret = process.env.SECRET;
  const token = req.cookies.auth;
  if (token == null) return res.status(403).json({ message: 'No valid token' });

  try {
    await jwt.verify(token, secret, async function (err, decoded) {
      if (!err && decoded) {
        return await next(req, res);
      }
    });
  } catch (err) {
    console.log(err);
  }
  return res.status(401).json({ message: 'Sorry you are not authenticated' });
}

export default authChecker(async function getIt(req, res) {
  const user = await auth.currentUser();
  console.log(user);
  if (!user) {
    return res.status(400).json({ message: 'User signed out' });
  }
  return res.status(200).json({
    uid: user.uid,
    firstname: user.firstname,
  });
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
