import React, { useState, useEffect, useCallback } from "react";
import firebase from "firebase";
import classes from "../UI/ui-modules/chatitem.module.css";
import Image from "next/image";
const ChatItem = (props) => {
  const { item, uid } = props;
  const [infoUrl, setInfo] = useState();
  const addData = useCallback(async () => {
    const dataref = firebase
      .firestore()
      .collection("user_aditional")
      .doc(item && item.added_by);
    await dataref.get().then((doc) => {
      const url = doc.data().image_url
        ? doc.data().image_url
        : "/images/noimage.svg";
      setInfo(url);
    });
  }, [setInfo]);
  useEffect(() => {
    addData();
  }, [addData]);
  return (
    <div className={classes.cover}>
      <div className={classes.image}>
        <Image
          width="40px"
          height="40px"
          quality={100}
          src={infoUrl ? infoUrl : "/images/noimage.svg"}
        />
      </div>
      <div className={item.added_by !== uid ? classes.text : classes.textsent}>
        {item && item.text}
      </div>
    </div>
  );
};
export default ChatItem;
