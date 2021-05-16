import firebase from "firebase";
import FirebaseClient from "../../../../helpers/firebase";

const firstPage = (fn) => async (req, res) => {
  FirebaseClient();
  const { uid } = req.body;
  const docRef = await firebase.firestore().collection("cookies").doc(uid);
  let userPref;
  await docRef
    .get()
    .then((snapshot) => {
      userPref = snapshot.data().pref_events;
      return fn(req, res, userPref, uid);
    })
    .catch((err) => console.log(err));
};
export default firstPage(async function getData(req, res, userPref, uid) {
  const gt = () => {
    const docref = firebase.firestore().collection("startup");
    const promises = userPref.map((item) => docref.doc(item).get());
    return Promise.all(promises).then((docks) => {
      const docArr = [];
      docks.forEach((doc) => {
        docArr.push(doc.data());
      });
      return docArr;
    });
  };

  const arrToSend = await gt();

  res.status(200).json({ m: arrToSend });
});
