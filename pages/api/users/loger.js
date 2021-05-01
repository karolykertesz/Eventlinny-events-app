import { db, auth } from '../../../helpers/firebase';
import firebase from 'firebase';
const validate = require('validate.js');
import { constraints } from '../../../helpers/validators/login';
export default async function handler(req, res) {
  auth.setPersistence(firebase.auth.Auth.Persistence.NONE);
  const { email, password } = req.body;
  const value = validate({ email, password }, constraints);
  if (value !== undefined) {
    return;
  }

  try {
    await auth.signInWithEmailAndPassword(email, password).then((userCred) => {
      let user = userCred.user;
      if (user && user.emailVerified) {
        return user.getIdToken().then((idToken) => {
        //   const csrfToken = getCookie('csrfToken');
          return res.status(200).json({
            message: 'Thank You',
            currentUser: {
              name: user.displayName,
              uid: user.uid,
            },
            idToken,
            // csrfToken,
          });
        });
      }
      return res.status(400).json({ message: 'Email Needs to be Verified!' });
    });
  } catch (err) {
    const errorCode = err.code;
    const errorMessage = err.message;
    return res.status(401).json({ message: errorMessage });
  }

  //   auth.onAuthStateChanged((userObj) => {
  //     if (userObj) {
  //       console.log(userObj.emailVerified);
  //     }
  //   });
  //   res.status(200).json({ message: 'good' });
}
