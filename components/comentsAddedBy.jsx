import React, { useEffect, useState } from "react";
import firebase from "firebase";
import classes from "./UI/ui-modules/CommentsAddedBy.module.css";
const CommentsAddedBy = ({ added_by }) => {
  const [userdata, setdata] = useState();
  console.log(userdata, "ffsssaaaassasf");
  console.log(added_by, "hhhh");

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
  return <div></div>;
};
