import firebase from "firebase";
const validateUrl = async (uid) => {
  try {
    await firebase
      .firestore()
      .collection("cookies")
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return true;
        } else {
          return false;
        }
      });
  } catch (err) {
    console.log(err);
  }
};
export default validateUrl;
