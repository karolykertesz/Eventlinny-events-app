import react, { useState, useCallback, useEffect } from "react";
import classes from "../UI/ui-modules/message.side.module.css";
import firebase from "firebase";
import Image from "next/image";

const MessageSideItem = (props) => {
  const { message, added, user } = props;
  const [url, setUrl] = useState();

  const getImage = useCallback(() => {
    const dataref = firebase
      .firestore()
      .collection("user_aditional")
      .doc(message.added_by);
    dataref.get().then((us) => {
      const imageurl = us.data().image_url
        ? us.data().image_url
        : "/images/noimage.svg";
      setUrl(imageurl);
    });
  }, [added, setUrl]);
  useEffect(() => {
    if (!added) {
      getImage();
    }
  }, [added, getImage]);
  return (
    <div>
      <div>
        <Image
          src={url ? url : "/images/noimage.svg"}
          width="50px"
          height="50px"
          quality={100}
        />
        {message.text}
      </div>
    </div>
  );
};

export default MessageSideItem;
