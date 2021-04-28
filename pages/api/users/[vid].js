import { db } from '../../../helpers/firebase';
export default async function handler(req, res) {
  const viid = req.query.vid;
  try {
    const dt = await db
      .collection('users')
      .where('vid', '==', `${viid}`)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          return res.status(200).json({ message: 'fine' });
        } else {
          return res.status(400).json({ error: 'fail' });
        }
      });
  } catch (err) {
    console.log('error');
  }
}
