import React, { useEffect, useState } from "react";
import firebase from "firebase";
export const useAttendiesInfo = (attendies) => {
  const [info, setInfo] = useState();
  useEffect(async () => {
    const attend = [];
    const dataref = firebase.firestore().collection("user_aditional");
    const promises = attendies.map((item) => dataref.doc(item).get());
    return Promise.all(promises).then((docu) => {
      docu.forEach((i) => {
        attend.push({
          id: i.id,
          name: i.data().name,
          imgUrl: i.data().image_url
            ? i.data().image_url
            : "/images/noimage.svg",
        });
      });
      return setInfo(attend);
    });
  }, [attendies]);
  return {
    info,
  };
};
