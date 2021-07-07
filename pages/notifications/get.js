import React, { useState, useEffect, useRef, useCallback } from "react";
import classes from "../../components/UI/ui-modules/notification.get.module.css";
import { useRouter } from "next/router";
import { categories } from "../../data";
import firebase from "firebase";
import NotiItem from "../../components/UI/notificationItem";

const GetNote = () => {
  const modeRef = useRef(true);
  const router = useRouter();
  const id = router.query.id;
  const filteredCat = categories.filter((i) => i !== "create");
  const [cat, setCat] = useState([]);
  const [isOn, setIsOn] = useState(false);
  const setItem = (item) => {
    if (cat.includes(item)) {
      let newArray = cat.filter((i) => i !== item);
      setCat(newArray);
    } else {
      cat.push(item);
    }
    setIsOn(!isOn);
  };
  // const dt = filteredCat.filter((item, inx) => !arr.includes(item));
  const getNotiz = useCallback(async () => {
    const docref = firebase.firestore().collection("user_aditional").doc(id);
    await docref.get().then((doc) => {
      let noteArray = doc.data().notification_pref
        ? doc.data().notification_pref
        : [];
      if (noteArray.length > 0) {
      }
    });
  }, [id]);

  return (
    <div className={classes.coverDiv}>
      <div className={classes.head}>
        <p>Would You like to recive Notifications?</p>
        <p>Select from Categories Below!!</p>
      </div>
      <div className={classes.body}>
        {filteredCat.map((item) => (
          <div className={classes.btn} onClick={() => setItem(item)} key={item}>
            <div className={classes.btnDiv}>
              <NotiItem item={item} />
            </div>
          </div>
        ))}
      </div>
      <div className={classes.footer}></div>
    </div>
  );
};
export default GetNote;
