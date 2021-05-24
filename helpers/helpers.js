import firebase from "firebase";

import FirebaseClient from "../helpers/firebase";
FirebaseClient();
import { getArray } from "./newhelpers";

export const send = async (location, userInt) => {
  if (!location || !userInt) {
    return;
  }
  const loc = location.join(",");
  const mess = await fetch("/api/users/createPref", {
    method: "POST",
    body: JSON.stringify({
      location: loc,
      userInt: userInt,
    }),

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const status = await mess.status;
  console.log(status, "the status");
  if (status === 200) {
    return (window.location.href = "/events/first");
  }
};

export const getUserdata = async (uid) => {
  const t = async (uid) => {
    const arr = await getArray(uid);
    if (arr) {
      const docref = firebase.firestore().collection("startup");
      const promises = arr.map((item) => docref.doc(item).get());
      return Promise.all(promises).then((docks) => {
        let dockArray = [];
        docks.forEach((i) => {
          dockArray.push({ id: i.id, ...i.data() });
        });
        return dockArray;
      });
    }
  };
  const arrayBack = await t(uid);
  return arrayBack;
};
