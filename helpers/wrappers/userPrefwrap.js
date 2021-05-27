import firebase from "firebase";

export const allUserPref = async (uid) => {
  let arrItem = [];
  const docref = firebase.firestore().collection("cookies").doc(uid);
  const t = await docref
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data().pref_events;
        return data;
      }
    })
    .then((data) => arrItem.push(data))
    .catch((err) => console.log(err));
  return getdifference(arrItem);
};

export const getdifference = async (arr) => {
  let keys = [];
  let id = [];
  const allkeys = await firebase.firestore().collection("startup");
  const k = await allkeys
    .get()
    .then((snapshot) => {
      snapshot.forEach((item) => {
        const id = item.id;
        keys.push(id);
      });
    })
    .catch((err) => console.log(err));
  //   const intersect = await arr.filter((item) => !keys.includes(item));
  console.log(intersect, "intersecto");
  console.log(arr, " the array");
  if (!intersect) {
    console.log("null");
    return null;
  }
  const t = await intersect.map((item) => {
    allkeys
      .doc(item)
      .get()
      .then((yt) => ({ ...yt.data() }));
  });
  console.log(t, "the t");

  console.log(arr, "the array");

  return t;
};
