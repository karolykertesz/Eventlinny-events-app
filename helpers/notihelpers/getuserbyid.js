import { data } from "browserslist";
import firebase from "firebase";

export const getuserbyid = async (id) => {
  let dataObj = {};
  const dataref = firebase.firestore().collection("notifications").doc(id);
  await dataref.get().then((doc) => {
    if (doc.exists) {
      dataObj = {
        unread: doc.data().unread,
        read: doc.data().read ? doc.data().read : null,
      };
    } else {
      dataObj = null;
    }
  });
  return dataObj;
};

export const fetUserKeys = async () => {
  const keys = [];
  try {
    const k = await firebase
      .firestore()
      .collection("notifications")
      .onSnapshot((snapshot) => {
        const ids = snapshot.docs.forEach((i) => {
          keys.push(i.id);
        });
      });
  } catch (err) {
    console.log(err);
  }
  return keys;
};
