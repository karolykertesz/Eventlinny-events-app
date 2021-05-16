import firebase from "firebase";
import FirebaseClient from "../../../../helpers/firebase";

const firstPage = (fn) => async (req, res) => {
  FirebaseClient();
  const { uid } = req.body;
  console.log(uid);
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
  console.log(userPref);
  const arrayToFront = [];
  // const docArray = await userPref
  //   .map((item) => {
  //     const docref = firebase.firestore().collection("startup").doc(item);
  //     return docref.get().then((snapshot) => {
  //       const dt = snapshot.data();
  //       return dt;
  //     });
  //   })
  //   .catch((err) => console.log(err));
  // console.log(docArray);
  res.status(200).json({ m: "nn" });
});
