import cookie from 'cookie';
export default async function handler(req, res) {
  const userToken = req.body.userToken;
  if (!userToken) {
    return res.status(401).json({ tokken: 'UNAUTHORIZED REQUEST!' });
  }

  const expiresIn = 60 * 60;
  try {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('fire', userToken, {
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
