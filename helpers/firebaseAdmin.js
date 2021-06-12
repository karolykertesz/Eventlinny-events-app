const admin = require("firebase-admin");
const serviceAccount = require("../service/serviceAccountKey");
export const fireAdm = () => {
  if (!admin.apps.length) {
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
    });
  }
};
const app = admin.initializeApp();
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
