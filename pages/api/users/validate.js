import firebase from 'firebase';
const jwt = require('jsonwebtoken');
import cookie from 'cookie';
export const authChecker = (fn) => async (req, res) => {
  const secret = process.env.SECRET;
  const token = req.cookies.auth;
  console.log(token);
  if (token == null) return res.status(403).json({ message: 'No valid token' });

  try {
    await jwt.verify(token, secret, async function (err, decoded) {
      if (!err && decoded) {
        return await fn(req, res);
      }
    });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
};

export default authChecker(async function getName(req, res) {
  const user = firebase.auth().currentUser;
  if (!user) return res.status(403).json({ massege: 'no User Signed in' });
  const uid = user.toJSON().uid;

  const userToken = { userId: uid };
  const token = jwt.sign({ userToken }, process.env.SESSION_SECRET, {
    expiresIn: '1h',
  });
  try {
    const coo = await res.setHeader(
      'Set-Cookie',
      cookie.serialize('fire', 'ggg', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        path: '/',
      })
    );
    res.status(200).json({ message: 'Everithing is great' });
  } catch (err) {
    res.status(400).json({ message: "token wasn't created" });
  }
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
