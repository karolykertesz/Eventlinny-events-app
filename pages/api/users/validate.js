import { db, auth } from '../../../helpers/firebase';
const jwt = require('jsonwebtoken');

export const authHandlet = (fn) => async (req, res) => {
  const secret = process.env.SECRET;
  jwt.verify(req.cookies.auth, secret, async function (err, decoded) {
    if (!err && decoded) {
      return await fn(req, res);
    }
    return res.status(400).json({ message: 'Not authorized user!' });
  });
};


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
