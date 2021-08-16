import React, { useState, useEffect, useCallback, Fragment } from "react";
import Image from "next/image";
import firebase from "firebase";
const MessageReplyItem = (props) => {
  const { item, user, messId } = props;
  console.log(user.uid === item.added_by);
  const [imageUrl, setUrl] = useState();
  const getImage = useCallback(() => {
    return firebase
      .firestore()
      .collection("user_aditional")
      .doc(item && item.added_by)
      .get()
      .then((doc) => {
        const data = doc.data();
        const url = data.image_url ? data.image_url : "/images/noimage.svg";
        setUrl(url);
      });
  });
  useEffect(() => {
    if (item.added_by && user.uid !== item.added_by) {
      getImage();
    }
  }, [getImage, messId]);
  return (
    <div>
      {item && (
        <Fragment>
          {item.added_by !== user.uid ? (
            <div>
              <Image
                src={imageUrl ? imageUrl : "/images/noimage.svg"}
                width="50px"
                height="50px"
              />
              <p>{item.input} ooooo</p>
            </div>
          ) : (
            <div>
              <p>{item.input}</p>
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};
export default MessageReplyItem;
