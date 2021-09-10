import firebase from "firebase";
import React, { useState, useEffect } from "react";

export const useSingleEvent = (id) => {
  const [event, setEvent] = useState({});
  useEffect(() => {
    const single = firebase
      .firestore()
      .collection("user_add_events")
      .doc(id)
      .onSnapshot((snap) => {
        if (snap.exists) {
          setEvent(() =>
            Object.assign(event, { id: snap.id, data: snap.data() })
          );
        }
      });
    return () => single();
  }, [id]);
  return {
    event,
  };
};
