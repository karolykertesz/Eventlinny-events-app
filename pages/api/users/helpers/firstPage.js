import firebase from "firebase";
const jwt = require("jsonwebtoken");
const firstPage = (fn) => async (req, res) => {
  const userSentId = req.body.uid ? req.body.uid : null;
  const auth = req.cookies.auth;
  let uidIn;
  try {
    const r = await jwt.verify(
      auth,
      process.env.SECRET,
      async function (err, decoded) {
        if (!err && decoded) {
          uidIn = await decoded.data;
        }
      }
    );
  } catch (err) {
    console.log(err);
    // return;
  }
  const value = userSentId !== null ? userSentId : uidIn;

  const docRef = await firebase
    .firestore()
    .collection("user_aditional")
    .doc(value);

  let userPref;
  try {
    await docRef
      .get()
      .then(async (snapshot) => {
        if (snapshot) {
          const eventss = await snapshot.data().pref_events;
          userPref = eventss;
          return fn(req, res, userPref, value);
        } else {
          res.status(300).json({ m: "no data" });
        }
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};
export default firstPage(async function getData(req, res, userPref, uid) {
  const gt = () => {
    const docref = firebase.firestore().collection("startup");
    const promises = userPref.map((item) => docref.doc(item).get());
    return Promise.all(promises).then((docks) => {
      const docArr = [];
      docks.forEach((doc) => {
        docArr.push({ id: doc.id, ...doc.data() });
      });
      return docArr;
    });
  };

  const arrToSend = await gt();
  res.status(200).json({ m: arrToSend });
});
