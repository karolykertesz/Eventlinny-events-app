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
  const intersect = await keys.filter((item) => !arr[0].includes(item));

  const promisefunc = () => {
    const promises = intersect.map((item) => allkeys.doc(item).get());
    return Promise.all(promises).then((docs) => {
      let newArray = [];
      docs.forEach((doc) => {
        newArray.push({ id: doc.id, ...doc.data() });
      });
      return newArray;
    });
  };
  const databack = promisefunc();
  return databack;
};
