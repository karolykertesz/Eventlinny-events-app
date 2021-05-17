import firebase from "firebase";
import FirebaseClient from "../../../../helpers/firebase";
const jwt = require("jsonwebtoken");
const firstPage = (fn) => async (req, res) => {
  FirebaseClient();
  const auth = req.cookies.auth;
  let uid;
  try {
    const r = await jwt.verify(
      auth,
      process.env.SECRET,
      async function (err, decoded) {
        if (!err && decoded) {
          uid = decoded.data;
        }
      }
    );
  } catch (err) {
    console.log(err);
    return;
  }
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
