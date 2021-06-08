import firebase from "firebase";

export const locAndCat = (loc, cat) => {
  return firebase
    .firestore()
    .collection("user_add_events")
    .where("location", "==", loc.toLowerCase())
    .where("category", "==", cat.toLowerCase())
    .get()
    .then((doc) => {
      let itemArray = [];
      doc.forEach((item) => {
        itemArray.push({
          start: item.data().starts.seconds * 1000,
          end: item.data().ends.seconds * 1000,
          category: item.data().category,
          location: item.data().location,
          added_by: item.data().added_by,
          premium: item.data().premium,
          Image: item.data().Image,
          id: item.id,
          attendies: item.data().attendies,
        });
      });
      return itemArray;
    });
};

export const onlyLoc = (loc) => {
  return firebase
    .firestore()
    .collection("user_add_events")
    .where("location", "==", loc.toLowerCase())
    .get()
    .then((doc) => {
      let itemArray = [];
      doc.forEach((item) => {
        itemArray.push({
          start: item.data().starts.seconds * 1000,
          end: item.data().ends.seconds * 1000,
          category: item.data().category,
          location: item.data().location,
          added_by: item.data().added_by,
          premium: item.data().premium,
          Image: item.data().Image,
          id: item.id,
          attendies: item.data().attendies,
        });
      });
      return itemArray;
    });
};

export const onlyCat = (cat) => {
  return firebase
    .firestore()
    .collection("user_add_events")
    .where("category", "==", cat.toLowerCase())
    .get()
    .then((doc) => {
      let itemArray = [];
      doc.forEach((item) => {
        itemArray.push({
          start: item.data().starts.seconds * 1000,
          end: item.data().ends.seconds * 1000,
          category: item.data().category,
          location: item.data().location,
          added_by: item.data().added_by,
          premium: item.data().premium,
          Image: item.data().Image,
          id: item.id,
          attendies: item.data().attendies,
        });
      });
      return itemArray;
    });
};