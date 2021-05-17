import admin from "firebase-admin";
import FirebaseClient from "../../../../helpers/firebase";

export const cuser = (usertoken) => {
  return new Promise((resolve, reject) => {
    let uid;
    admin
      .auth()
      .verifyIdToken(usertoken)
      .then((decodedToken) => {
        const userId = decodedToken.uid;
        uid = userId;
      });
    return uid;
  });
};
