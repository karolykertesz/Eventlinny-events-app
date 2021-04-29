import { init } from 'next-firebase-auth';
const initAuth = () => {
  init({
    authPageURL: '/auth',
    appPageURL: '/',
    loginAPIEndpoint: '/api/users/[vid]', // required
    logoutAPIEndpoint: '/api/users/logout', // required
    firebaseAuthEmulatorHost: process.env.FIREBASE_AUTH_EMULATOR_HOST,
    // Required in most cases.
    firebaseAdminInitConfig: {
      credential: {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // The private key must not be accesssible on the client side.
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
      },
      databaseURL: process.env.FIREBASE_DB_URL,
    },
    firebaseClientInitConfig: {
      apiKey: 'AIzaSyB4F8VHK-E3VCcWzRcXpfIh5tGpHFuAKTA',
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DB_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
    },
    cookies: {
      name: 'NextEvents', // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000, // 1 day
      overwrite: true,
      path: '/',
      sameSite: 'strict',
      secure: true,
      signed: true,
    },
  });
};

export default initAuth;
