import firebase from "firebase";

export const addtocategories = async (email, catarray) => {
  const docref = await firebase.firestore().collection("notification_sent");
  return catarray.map((item) =>
    docref.doc(item).update({
      emails: firebase.firestore.FieldValue.arrayUnion(email),
    })
  );
};
