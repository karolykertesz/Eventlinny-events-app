import React, { useEffect, useState } from "react";
import Image from "next/image";
import firebase from "firebase";
import classes from "../holders/css/commentsHead.module.css";
const CommentHead = ({ id }) => {
  const [userdata, setdata] = useState();
  const geturl = () => {
    return firebase
      .firestore()
      .collection("user_aditional")
      .doc(id)
      .get()
      .then((docs) => {
        const data = docs.data();
        if (!docs.exists) return;
        return {
          name: data.name,
          url: data.image_url ? data.image_url : "/images/noimage.svg",
        };
      })
      .then((item) => {
        const { name, url } = item;
        setdata({
          name,
          url,
        });
      });
  };
  useEffect(() => {
    return geturl();
  }, []);
  return (
    <div>
      {userdata && (
        <div className={classes.top}>
          <p>added by {userdata.name}</p>
          <Image width="60px" height="60px" src={userdata.url} quality={100} />
        </div>
      )}
    </div>
  );
};
export default CommentHead;
