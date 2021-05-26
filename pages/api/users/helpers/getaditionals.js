import firebase from "firebase";
export default function helper(req, res) {
  const uid = req.body.uid;
  return new Promise((resolve, reject) => {
    const docref = firebase.firestore().collection("user_aditional").doc(uid);
    return docref
      .get()
      .then((doc) => {
        const userAditional = doc.data();
        return res.status(200).json({ m: userAditional });
      })
      .then(() => console.log("done"))
      .catch((err) => console.log(err));
  });
}
