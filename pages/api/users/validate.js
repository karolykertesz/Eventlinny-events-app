import firebase from "firebase";
const validateUrl = async (uid) => {
  const docref = await firebase.firestore().collection("cookies").doc(uid);
  return docref.get().then((doc) => {
    if (doc.exists) {
      return true;
    } else {
      return false;
    }
  });
};
export default validateUrl;
