import React, { useEffect, useState } from "react";
import Image from "next/image";
import firebase from "firebase";
import classes from "../holders/css/commentsHead.module.css";
const CommentHead = ({ id }) => {
  const [userdata, setdata] = useState();
  const geturl = async () => {
    return firebase
      .firestore()
      .collection("user_aditional")
      .doc(id)
      .get()
      .then((docs) => {
        if (docs.exists) {
          return {
            name: docs.data().name,
            url: docs.data().image_url
              ? docs.data().image_url
              : "/images/noimage.svg",
          };
        }
      });
  };
  useEffect(() => {
    let mode = true;
    geturl().then((items) => {
      if (mode) {
        setdata(items);
      }
    });
    return () => {
      mode = false;
    };
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
