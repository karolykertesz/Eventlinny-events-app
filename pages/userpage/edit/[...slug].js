import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { useRouter } from "next/router";
import { allUserPref } from "../../../helpers/wrappers/userPrefwrap";
import StartItem from "../../../components/startitem";
import CreateEvent from "../../../components/createEvent";
import { Grid } from "../../../components/UI/styledindex";
import { useRedirect } from "../../../helpers/validatehelp";

const Slug = () => {
  useRedirect();
  const [data, seTdata] = useState();
  const router = useRouter();
  const query = router.query.slug;
  useEffect(() => {
    // let isTrue = true;
    // if (query && isTrue) {
    //   return allUserPref(query[1])
    //     .then(async (t) => {
    //       const dtObj = await t;
    //       return seTdata(dtObj);
    //     })
    //     .then(() => console.log("hh"))
    //     .catch((err) => console.log(err));
    // }
    // return () => (isTrue = false);
    const dataref = firebase
      .firestore()
      .collection("user_aditional")
      .doc(query && query[1])
      .onSnapshot((snap) => {
        if (!snap.exists) return;
        const prefs = snap.data().pref_events ? snap.data().pref_events : [];
        seTdata(prefs);
      });
    // return dataref();
  }, []);
  console.log(data, "ggg");
  const uid = query && query[1];
  const addUserInt = (id) => {
    if (uid) {
      const docref = firebase.firestore().collection("cookies").doc(uid);
      return docref
        .update({
          pref_events: firebase.firestore.FieldValue.arrayUnion(id),
        })
        .then(() => alert("done"));
    }
  };

  return (
    <div>
      {query && query[0] === "addNewPref" ? (
        <Grid>
          {data !== undefined &&
            data.map((items, indx) => (
              <span key={items.id}>
                <StartItem items={items} addUserInt={addUserInt} />
              </span>
            ))}
        </Grid>
      ) : (
        <div>
          {query ? <CreateEvent uid={query && query[1]} /> : <p>Loading</p>}
        </div>
      )}
    </div>
  );
};

export default Slug;
