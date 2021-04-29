import { db } from '../../../helpers/firebase';
export default async function handler(req, res) {
  const viid = req.query.vid;
  let usid;
  try {
    const dt = await db
      .collection('users')
      .where('vid', '==', `${viid}`)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          snapshot.forEach((i) => {
            return (usid = i.id);
          });
        }
      });
  } catch (err) {
    return res.status(400).json({ error: 'fail' });
  }
  try {
    const changed = await db.collection('users').doc(usid).update({
      isValidated: true,
    });
  } catch (err) {
    return res.status(400).json({ error: 'Validation Failed' });
  }
  return res.status(200).json({ message: 'Thank You You may login' });
}
