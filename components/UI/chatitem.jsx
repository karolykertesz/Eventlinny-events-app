import React, { useState, useEffect, useCallback } from "react";
import firebase from "firebase";
import classes from "../UI/ui-modules/chatitem.module.css";
import { useUserInfo } from "../../helpers/firebase-hooks/get-user-info";
import Image from "next/image";
const ChatItem = (props) => {
  const { item, uid } = props;
  const { userInfo } = useUserInfo(item.added_by);
  console.log(userInfo);
  const infoUrl =
    userInfo && userInfo.image_url ? userInfo.image_url : "/images/noimage.svg";
  const [banned, setBanned] = useState([]);
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
    getbanned();
  }, [getbanned]);
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
