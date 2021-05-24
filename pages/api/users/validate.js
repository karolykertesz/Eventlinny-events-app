import firebase from "firebase";
const validateUrl = async (uid) => {
  let url;
  try {
    await firebase
      .firestore()
      .collection("cookies")
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          url = true;
        } else {
          url = false;
        }
      });
  } catch (err) {
    console.log(err);
  }
  return url;
};
export default validateUrl;
