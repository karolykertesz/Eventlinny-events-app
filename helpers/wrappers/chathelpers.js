import firebase from "firebase";

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
  await docref.get().then((doc) => {
    if (doc.exists) {
      const data = doc.data();
      (link = data.linkVerif), (pass = data.password);
    } else {
      link = null;
      pass = null;
    }
  });
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
    const data = await doc.data();
    const tokens = data.tokens;
    const unverified = data.unverified;
    const findToken = tokens.find((item) => item === token);
    const findEmail = unverified.find((item) => item === email);
    if ((findToken, findEmail)) {
      isVerif = "Verified";
    } else {
      isVerif = null;
    }
  });
  return isVerif;
};

export const clearOut = async (room, token, email) => {
  const docref = firebase
    .firestore()
    .collection("private_chat_users")
    .doc(room);
  await docref.update({
    verified: firebase.firestore.FieldValue.arrayUnion(email),
    unverified: firebase.firestore.FieldValue.arrayRemove(email),
    tokens: firebase.firestore.FieldValue.arrayRemove(token),
  });
};
