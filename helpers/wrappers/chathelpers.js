import firebase from "firebase";
import { v4 as uuid_v4 } from "uuid";

export const getLinkVerif = async (room) => {
  let link;
  const docref = firebase.firestore().collection("private_chat").doc(room);
  await docref.get().then((doc) => {
    if (doc.exists) {
      const data = doc.data();
      link = data.linkVerif;
    } else {
      link = null;
    }
  });

  return link;
};
export const getLinkAndPass = async (room) => {
  let link;
  let pass;
  const docref = firebase.firestore().collection("private_chat").doc(room);
  await docref.get().then(async (doc) => {
    console.log(doc.data(), "ggggggg");
    if (doc.exists) {
      (link = await doc.data().linkVerif), (pass = await doc.data().password);
      console.log(doc.data());
    } else {
      link = null;
      pass = null;
    }
  });
  console.log(link);
  console.log(pass);
  return {
    link,
    pass,
  };
};

export const getUserEmail = async (uid) => {
  let email;
  const docref = firebase.firestore().collection("user_aditional").doc(uid);
  await docref.get().then((doc) => {
    if (doc.exists) {
      const data = doc.data();
      email = data.email;
    } else {
      email = null;
    }
  });
  return email;
};

export const verifyAndSend = async (room, token, email) => {
  let isVerif;
  const docref = await firebase
    .firestore()
    .collection("private_chat_users")
    .doc(room);
  await docref.get().then(async (doc) => {
    if (doc.exists) {
      const tokens = await doc.data().tokens;
      const unverified = await doc.data().unverified;
      const findToken = await tokens.find((item) => item === token);
      const findEmail = await unverified.find((item) => item === email);
      if (!findToken || !findEmail) {
        isVerif = null;
      } else {
        isVerif = "Verified";
      }
    }
  });
  return isVerif;
};

export const clearOut = async (room, token, email) => {
  return firebase
    .firestore()
    .collection("private_chat_users")
    .doc(room)
    .update({
      unverified: firebase.firestore.FieldValue.arrayRemove(email),
      verified: firebase.firestore.FieldValue.arrayUnion(email),
      tokens: firebase.firestore.FieldValue.arrayRemove(token),
    });
};

export const writteNoti = async (uid, pass, room) => {
  const docref = firebase.firestore().collection("notifications").doc(uid);
  await docref.get().then(async (doc) => {
    if (doc.exists) {
      await docref.update({
        unread: firebase.firestore.FieldValue.arrayUnion({
          id: uuid_v4(),
          text: [
            `Remainder: Your credentials to enter , room name: ${room}, Your password ${pass}`,
          ],
          created_at: Date.now(),
        }),
      });
    } else {
      docref.set(
        {
          unread: [
            {
              id: uuid_v4(),
              text: [
                `Remainder: Your credentials to enter , room name: ${room}, Your password: ${pass}`,
              ],
              created_at: Date.now(),
            },
          ],
        },
        { merge: true }
      );
    }
  });
};
