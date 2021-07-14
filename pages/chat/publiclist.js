import React, { useEffect, useState, useRef, useCallback } from "react";
import classes from "../../components/UI/ui-modules/publiclist.module.css";
import firebase from "firebase";
// import { getPublicChatsHelper } from "../../helpers/wrappers/chathelpers";
import { useRedirect } from "../../helpers/validatehelp";
import PublicItem from "../../components/publicitem";
import Search from "../../components/UI/reactbootstrap/checksearch";
const PubliList = () => {
  useRedirect();
  const modeRef = useRef(true);

  const [data, setData] = useState();
  const [checked, setChecked] = useState();
  const [searched, setSearched] = useState(null);

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
  return (
    <div className={classes.allTop}>
      <div className={classes.sliderHolder}>
        <p className={classes.label}>
          {!checked ? "Slide to Find Your chat" : "close SLIDE"}
        </p>
        <label className={classes.switch}>
          <input
            type="checkbox"
            name="switch"
            onChange={(e) => setChecked(e.target.checked)}
          />
          <span className={classes.slider + " " + classes.round}></span>
        </label>
      </div>
      {checked ? (
        <div className={classes.cover}>
          <div>
            <Search setSearched={setSearched} />
          </div>
        </div>
      ) : (
        <div className={classes.cover}>
          <p>
            Listed of Public chats, Hover to get more info or click on room and
            enter
          </p>

          <div className={classes.top}>
            {data &&
              data.map((item) => (
                <div key={item.id}>
                  <PublicItem item={item} />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default PubliList;
