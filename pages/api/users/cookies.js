import cookie from 'cookie';
import firebase from 'firebase';
export default async function handler(req, res) {

  const expiresIn = 60 * 60;
  try {
    await res.setHeader(
      'Set-Cookie',
      cookie.serialize('fire', too, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        path: '/',
        maxAge: expiresIn,
        
      })
    );
  } catch (err) {
    res.status(400).json({ tokken: 'UNAUTHORIZED' });
  }

  res.status(200).json({ tokken: 'all Good' });
}
