import React, { useState, useEffect } from "react";
import firebase from "firebase";
export const useArchiveData = (id = "g") => {
  const [items, setItems] = useState();
  useEffect(() => {
    const dataRef = firebase
      .firestore()
      .collection("user_add_events")
      .doc(id)
      .onSnapshot((snap) => {
        if (snap.exists) {
          const data = snap.data();
          const arcData = {
            id: snap.id,
            start: data.starts.toMillis(),
            category: data.category,
            added_by: data.added_by,
            location: data.location,
            attendies: data.attendies,
            premium: data.premium,
            description: data.description,
            created_by: data.created_by,
            archive_photos: data.archive_photos
              ? data.archive_photos.map((it) => ({
                  ...it,
                  image_added_at: new Date(it.image_added_at).getTime(),
                }))
              : null,
          };
          setItems(arcData);
        }
      });
    return () => dataRef();
  }, [setItems, id]);
  return {
    items,
  };
};
