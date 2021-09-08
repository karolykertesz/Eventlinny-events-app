import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { useRouter } from "next/router";
import { allUserPref } from "../../../helpers/wrappers/userPrefwrap";
import StartItem from "../../../components/startitem";
import CreateEvent from "../../../components/createEvent";
import { Grid } from "../../../components/UI/styledindex";
import { useRedirect } from "../../../helpers/validatehelp";
import { selectedCategories } from "../../../data";
import classes from "../../../components/UI/ui-modules/startitem.module.css";
const Slug = () => {
  useRedirect();
  const [data, seTdata] = useState([]);
  const router = useRouter();
  const query = router.query.slug;

  const notSelected =
    data.length > 0 &&
    selectedCategories.filter((item) => data.indexOf(item) < 0);
  useEffect(() => {
    const dataref = firebase
      .firestore()
      .collection("user_aditional")
      .doc(query && query[1])
      .onSnapshot((snap) => {
        if (!snap.exists) return;
        const prefs = snap.data().pref_events ? snap.data().pref_events : [];
        seTdata(prefs);
      });
    return () => dataref();
  }, [query]);
  const uid = query && query[1];
  const addUserInt = (id) => {
    if (uid) {
      const docref = firebase.firestore().collection("user_aditional").doc(uid);
      return docref
        .update({
          pref_events: firebase.firestore.FieldValue.arrayUnion(id),
        })
        .then(() => alert("done"));
    }
  };
  console.log(notSelected);
  return (
    <div>
      {query && query[0] === "addNewPref" ? (
        <div style={{ position: "relative" }}>
          {notSelected && notSelected.length > 0 ? (
            <div className={classes.innerGrid}>
              {notSelected.map((items, indx) => (
                <span key={indx}>
                  <StartItem items={items} addUserInt={addUserInt} />
                </span>
              ))}
            </div>
          ) : (
            <div className={classes.setcategories}>
              <p>You have added all caterories!!</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          {query ? <CreateEvent uid={query && query[1]} /> : <p>Loading</p>}
        </div>
      )}
    </div>
  );
};

export default Slug;
