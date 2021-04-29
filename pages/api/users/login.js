import { db } from '../../../helpers/firebase';
// import initAuth from '../../../helpers/fireadmin';
// import { setAuthCookies } from 'next-firebase-auth';
import { constraints } from '../../../helpers/validators/login';
const validate = require('validate.js');
const bcrypt = require('bcrypt');
import admin from 'firebase-admin';

export default async function handler(req, res) {
  const { email, password } = req.body;

  let userInfo = [];
  const value = await validate(
    {
      email,
      password,
    },
    constraints
  );
  if (value !== undefined) {
    return res.status(400).json({ error: 'Invalid Values Provided!!' });
  }
  try {
    const dt = await db
      .collection('users')
      .where('email', '==', email)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          snapshot.forEach((i) => {
            let info = { docId: i.id, ...i.data() };
            return userInfo.length > 0
              ? userInfo.splice(1, info)
              : userInfo.push(info);
          });
        }
      });
  } catch (err) {
    return res
      .status(401)
      .json({ error: 'Invalid credentials were  Provided!!' });
  }
  const hash = await bcrypt.compareSync(password, userInfo[0].password);

  if (hash === false) {
    return res.status(401).json({ error: 'invalid password' });
  }
  if (userInfo[0].isValidated === false) {
    return res.status(401).json({ error: 'You need to validate your email' });
  }
  const uid = userInfo[0].docId;
  await admin
    .auth().generateEmailVerificationLink
 
    .catch((error) => {
      console.log('Error fetching user data:', error);
    });
  try {
    await admin
      .auth()
      .createCustomToken(uid)
      .then((customToken) => {
        return res.status(200).send({
          message: {
            token: customToken,
            email,
            firstname: userInfo[0].firstname,
          },
        });
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Unexpected error.' });
  }
  console.log(userInfo[0]);
}
