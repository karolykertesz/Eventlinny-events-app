import { db, auth } from '../../../helpers/firebase';
import admin from 'firebase-admin';
const validate = require('validate.js');
import { constraints } from '../../../helpers/validators/login';
const jwt = require('jsonwebtoken');
import cookie from 'cookie';
export const handler = (fn) => async (req, res) => {
  const { email, password } = req.body;
  const value = validate({ email, password }, constraints);
  if (value !== undefined) {
    return;
  }

  return auth
    .signInWithEmailAndPassword(email, password)
    .then((userCred) => {
      if (!userCred) {
        return res
          .status(404)
          .json({ message: 'Not a Valid user or password' });
      }
      let user = userCred.user;
      if (user && user.emailVerified) {
        let uid = user.uid;
        const uidToken = { uid: user.uid, firstname: user.firstname };
        const token = jwt.sign(uidToken, process.env.SECRET, {
          expiresIn: '1h',
        });
        //
        res.setHeader(
          'Set-Cookie',
          cookie.serialize('auth', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            path: '/',
            maxAge: 3600,
          })
        );
        return fn(req, res, uid);
      }
      return res.status(400).json({ message: 'Email Needs to be Verified!' });
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      return res.status(500).json({ message: errorMessage });
    });
};

export default handler(async function getToken(req, res, uid) {
  try {
    const tokken = await admin
      .auth()
      .createCustomToken(uid)
      .then((customToken) => {
        return customToken;
      })
      .catch((err) => {
        console.log(err);
      });

    return res.status(200).json({ tokken: tokken });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: 'Token was not created' });
  }
});

// res.status(200).json({ message: 'Everithing is great' });
