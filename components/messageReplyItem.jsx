import React, { useState, useEffect, useCallback, Fragment } from "react";
import classes from "../components/UI/ui-modules/message.reply.item.module.css";
import Image from "next/image";
import firebase from "firebase";
const MessageReplyItem = (props) => {
  const { item, user, messId, added } = props;
  const [imageUrl, setUrl] = useState();
  const humanDate = new Date(item.created_at.seconds * 1000).toLocaleString(
    "HU-hu",
    {
      day: "numeric",
      year: "numeric",
      month: "numeric",
    }
  );
  const getImage = useCallback(() => {
    return firebase
      .firestore()
      .collection("user_aditional")
      .doc(item && item.recived)
      .get()
      .then((doc) => {
        const data = doc.data();
        const url = data.image_url ? data.image_url : "/images/noimage.svg";
        setUrl(url);
      });
  });
  useEffect(() => {
    if (item.added_by) {
      getImage();
    }
  }, [getImage, messId]);
  return (
    <div className={classes.messageList}>
      {item && (
        <Fragment>
          <div className={classes.content}>
            <div
              className={
                item.added_by === user.uid ? classes.added : classes.recived
              }
            >
              <Image
                src={imageUrl ? imageUrl : "/images/noimage.svg"}
                width="50px"
                height="50px"
              />
              <p className={classes.text}>{item.input}</p>
              <p className={classes.date}>{humanDate}</p>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};
export default MessageReplyItem;
