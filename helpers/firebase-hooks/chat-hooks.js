import firebase from "firebase";
const singOut = async (uid, id, type) => {
  const dataref = firebase
    .firestore()
    .collection(type)
    .doc(id && id);
  await dataref
    .update({
      active_users: firebase.firestore.FieldValue.arrayRemove(uid),
    })
    .then(() => (window.location = "/chat/main"));
};
export default singOut;
