// import firebase from "firebase";

// import FirebaseClient from "../helpers/firebase";
// FirebaseClient();
// export const getArray = async (uid) => {
//   let dataObj;
//   try {
//     await firebase
//       .firestore()
//       .collection("cookies")
//       .doc(uid)
//       .get()
//       .then(async (doc) => {
//         if (doc.exists) {
//           const docData = await doc.data();
//           dataObj = await docData.pref_events;
//         }
//       });
//   } catch (err) {
//     console.log(err);
//   }
//   return dataObj;
// };
