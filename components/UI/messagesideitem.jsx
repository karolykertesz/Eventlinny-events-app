import react, { useState, useCallback, useEffect } from "react";
import classes from "../UI/ui-modules/message.side.module.css";
import firebase from "firebase";
import Image from "next/image";

const MessageSideItem = (props) => {
  const { message, added, user } = props;
  const [url, setUrl] = useState();
  const humanDate = new Date(message.created_at.seconds * 1000).toLocaleString(
    "HU-hu",
    {
      day: "numeric",
      year: "numeric",
      month: "numeric",
    }
  );
  const getImage = useCallback(() => {
    const dodId =
      message.added_by !== user.uid ? message.added_by : message.recived;
    const dataref = firebase
      .firestore()
      .collection("user_aditional")
      .doc(dodId);
    dataref.get().then((us) => {
      const imageurl = us.data().image_url
        ? us.data().image_url
        : "/images/noimage.svg";
      setUrl(imageurl);
    });
  }, [added, setUrl]);
  useEffect(() => {
    getImage();
  }, [added, getImage]);
  return (
    <div>
      <div className={classes.listItem}>
        <Image
          src={url ? url : "/images/noimage.svg"}
          width="50px"
          height="50px"
          quality={100}
        />
        <div className={classes.inn}>
          <div className={classes.title}>
            <p style={{ color: "#fff" }}>{message.text}</p>
          </div>
          <div className={classes.date}>
            <p>{humanDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageSideItem;
