import React, { useState, useEffect, Fragment } from "react";
import firebase from "firebase";
import Image from "next/image";
import { PiBig } from "../UI/styledindex";
import classes from "../UI/ui-modules/topimage.module.css";
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from "constants";
const TopImage = ({ added_by }) => {
  const [userdata, setdata] = useState();
  const geturl = () => {
    return firebase
      .firestore()
      .collection("user_aditional")
      .doc(added_by)
      .get()
      .then((docs) => {
        const data = docs.data();
        return {
          name: data.name,
          url: data.image_url ? data.image_url : "/images/noimage.svg",
        };
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
    <Fragment>
      {userdata && (
        <div className={classes.top}>
          <Image src={userdata && userdata.url} height="70px" width="70px" />
          <div>
            <h5>Hosted By: {userdata && userdata.name}</h5>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default TopImage;
