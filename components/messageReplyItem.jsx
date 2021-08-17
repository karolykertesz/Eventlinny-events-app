import React, { useState, useEffect, useCallback, Fragment } from "react";
import classes from "../components/UI/ui-modules/message.reply.item.module.css";
import Image from "next/image";
import firebase from "firebase";
const MessageReplyItem = (props) => {
  const { item, user, messId, added } = props;
  const [imageUrl, setUrl] = useState();
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
    <div>
      {item && (
        <Fragment>
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
            <p>{item.input}</p>
          </div>
        </Fragment>
      )}
    </div>
  );
};
export default MessageReplyItem;
