import React, { useState, useEffect } from "react";
import firebase from "firebase";
export const useUserPrefCategories = (caRray) => {
  const [prefItems, setPrefItems] = useState([]);

  useEffect(() => {
    const docsArray = [];
    const docref = firebase.firestore().collection("user_add_events");
    const promises = caRray.map((it) =>
      docref.where("category", "==", it).where("starts", ">", new Date()).get()
    );
    return Promise.all(promises).then((docsItems) => {
      docsItems.forEach((items) => {
        items.forEach((item) => {
          docsArray.push({
            id: item.id,
            start: item.data().starts.toMillis(),
            category: item.data().category,
            added_by: item.data().added_by,
            location: item.data().location,
            attendies: item.data().attendies,
            premium: item.data().premium,
            description: item.data().description,
          });
        });
      });
      return setPrefItems(docsArray);
    });
  }, [caRray]);
  return {
    prefItems,
  };
};
