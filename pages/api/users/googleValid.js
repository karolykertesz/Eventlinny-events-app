import firebase from "firebase";
import FirebaseClient from "../../../helpers/firebase";
FirebaseClient();
const vGoogle = async (req, res) => {
  let url;
  const uid = req.body.uid;
  const docref = firebase.firestore().collection("cookies").doc(uid);
  await docref
    .get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        url = "/events/first";
      } else {
        url = "/startup";
      }
    })
    .catch((err) => console.log(err));
  res.status(200).json({ url: url });
};

export default vGoogle;
