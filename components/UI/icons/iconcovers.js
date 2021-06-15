import classes from "../ui-modules/styled.module.css";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import Image from "next/image";
export const IconDock = (props) => {
  const { icon: Icon } = props;
  return (
    <div className={classes.icontop}>
      <Icon />
    </div>
  );
};

export const ComentContainer = ({ children }) => {
  return <li className={classes.comentCont}>{children}</li>;
};

export const CommentHolder = (props) => {
  return <div className={classes.holder}>{props.children}</div>;
};

export const UseComentTop = (props) => {
  const { uid } = props;
  console.log(uid);
  const [info, setInfo] = useState();
  useEffect(() => {
    return firebase
      .firestore()
      .collection("user_aditional")
      .doc(uid)
      .get()
      .then((docU) => {
        const data = docU.data();
        return setInfo({
          name: data.name,
          url: data.image_url ? data.image_url : "/images/noimage.svg",
        });
      })
      .then(() => {});
  }, []);

  return (
    <div>
      {info && (
        <div className={classes.commentDiv}>
          <p>By : {info ? info.name : "k"}</p>
          <Image width="80px" height="80px" src={info.url} />
        </div>
      )}
    </div>
  );
};
