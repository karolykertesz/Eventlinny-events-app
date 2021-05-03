import { db, auth } from '../../../helpers/firebase';
import firebase from 'firebase';
const validate = require('validate.js');
import { constraints } from '../../../helpers/validators/login';
const jwt = require('jsonwebtoken');
import cookie from 'cookie';
export default async function handler(req, res) {
  const { email, password } = req.body;
  const value = validate({ email, password }, constraints);
  if (value !== undefined) {
    return;
  }

  try {
    await auth.signInWithEmailAndPassword(email, password).then((userCred) => {
      let user = userCred.user;
      if (user && user.emailVerified) {
        // return user.getIdToken().then((idToken) => {
        const uidToken = { uid: user.uid, firstname: user.firstname };
        const token = jwt.sign(uidToken, process.env.SECRET, {
          expiresIn: '1h',
        });

        res.setHeader(
          'Set-Cookie',
          cookie.serialize('auth', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 3600,
            path: '/',
          })
        );
        return res.status(200).json({
          message: 'Everithing is great',
        });
        // }

        // );
      }
      return res.status(400).json({ message: 'Email Needs to be Verified!' });
    });
  } catch (err) {
    const errorCode = err.code;
    const errorMessage = err.message;
    return res.status(401).json({ message: errorMessage });
  }
}
