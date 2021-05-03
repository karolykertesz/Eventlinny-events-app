import { withIronSession } from 'next-iron-session';

export const sessionOptions = {
  password: process.env.SESSION_SECRET,
  cookieName: 'user',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: (ttl === 0 ? 2147483647 : ttl) - 60,
    path: '/',
  },
};

export default function withSession(handler) {
  return withIronSession(handler, sessionOptions);
}
