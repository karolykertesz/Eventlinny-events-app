const admin = require("firebase-admin");
const serviceAccount = require("../service/next-events-309cd-firebase-adminsdk-5vizw-f25b60cc6e.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
  });
}

export default function getToken(token) {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
    });
  }
  return admin
    .auth()
    .verifyIdToken(token)
    .catch((err) => console.log(err));
}
export const AuthM = async (uid) => {
  const user = {};
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
    });
  }
  await admin
    .auth()
    .getUser(uid)
    .then(async (useRec) => {
      const authObj = await useReck;
      user = { ...useRec };
    });
  return user;
};
export const adminAuth = admin.auth();
