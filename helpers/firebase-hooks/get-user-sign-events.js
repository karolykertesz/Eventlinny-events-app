import React, { useState, useEffect } from "react";
import firebase from "firebase";
export const useGetSignEvents = (id = "") => {
  const [signed, setSigned] = useState([]);
  const currentDate = new Date();
  useEffect(() => {
    const allEvents = firebase
      .firestore()
      .collection("user_add_events")
      .where("attendies", "array-contains", id)
      .where("starts", ">=", currentDate)
      .onSnapshot((snap) => {
        const dataArr = [];
        snap.docs.forEach((doc) => {
          const data = doc.data();
          if (data.meeting) {
            dataArr.push({
              id: doc.id,
              description: data.description,
              meet_starts: data.starts,
              category: data.category,
              ...data.meeting,
            });
          }
        });
        setSigned(dataArr);
      });
    return () => allEvents();
  }, [setSigned, id]);
  return {
    signed,
  };
};
