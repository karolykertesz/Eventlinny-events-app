const admin = require("firebase-admin");
const serviceAccount = require("../service/next-events-309cd-firebase-adminsdk-5vizw-f25b60cc6e.json");

export default fireAdmin = () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DB_URL,
    });
  }
};
