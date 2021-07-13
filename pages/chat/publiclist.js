import React, { useEffect, useState, useRef, useCallback } from "react";
import classes from "../../components/UI/ui-modules/publiclist.module.css";
import firebase from "firebase";
// import { getPublicChatsHelper } from "../../helpers/wrappers/chathelpers";
import { useRedirect } from "../../helpers/validatehelp";
import PublicItem from "../../components/publicitem";
const PubliList = () => {
  useRedirect();
  const modeRef = useRef(true);
  const [data, setData] = useState();
  const getData = useCallback(async () => {
    const docref = firebase.firestore().collection("public_chat");
    let docArray = [];
    await docref
      .get()
      .then((doc) => {
        doc.forEach((i) => {
          docArray.push({
            id: i.id,
            ...i.data(),
          });
        });
      })
      .then(() => {
        setData(docArray);
      });
  }, [setData]);
  useEffect(() => {
    getData();
  }, [getData]);
  console.log(data);
  return (
    <div className={classes.cover}>
      <div className={classes.top}>
        {data &&
          data.map((item) => (
            <div key={item.id}>
              <PublicItem item={item} />
            </div>
          ))}
      </div>
    </div>
  );
};
export default PubliList;
