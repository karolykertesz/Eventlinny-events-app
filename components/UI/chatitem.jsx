import React, { useState, useEffect, useCallback } from "react";
import firebase from "firebase";
import classes from "../UI/ui-modules/chatitem.module.css";
import Image from "next/image";
const ChatItem = (props) => {
  const { item, uid } = props;
  const [infoUrl, setInfo] = useState();
  const [banned, setBanned] = useState([]);
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
  const getbanned = useCallback(() => {
    const users = [];
    return firebase
      .firestore()
      .collection("banned_users")
      .get()
      .then((docs) => {
        if (docs.size > 0) {
          docs.forEach((doc) => {
            users.push(doc.id);
          });
          setBanned(users);
        } else {
          return;
        }
      });
  }, [setBanned]);
  useEffect(() => {
    addData();
  }, [addData]);
  useEffect(() => {
    getbanned();
  }, [getbanned]);
  console.log(item.added_by);
  return (
    <div
      className={
        banned && banned.includes(item.added_by)
          ? classes.cover + " " + classes.banned
          : classes.cover
      }
    >
      <div className={classes.image}>
        <Image
          width="40px"
          height="40px"
          quality={100}
          src={
            infoUrl && !banned.includes(item.added_by)
              ? infoUrl
              : "/images/noimage.svg"
          }
        />
      </div>
      <div className={item.added_by !== uid ? classes.text : classes.textsent}>
        {item && !banned.includes(item.added_by) ? (
          <>{item.text}</>
        ) : (
          <>User banned From chat</>
        )}
      </div>
    </div>
  );
};
export default ChatItem;
