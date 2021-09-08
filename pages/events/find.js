import React, { useState, useEffect, useCallback, useRef } from "react";
import BigLoader from "../../components/UI/BigLoader";
import EventList from "../../components/EventList";
import {
  onlyCat,
  onlyLoc,
  locAndCat,
} from "../../helpers/wrappers/findfunctions";

import { PiBig, Error } from "../../components/UI/styledindex";
import classes from "../../components/UI/ui-modules/find.module.css";
import { useAuth } from "../../components/Layout/UserContext";
import FindImage from "../../components/findImage";
import firebase from "firebase";
import { useRedirect } from "../../helpers/validatehelp";
import Search from "../../components/UI/icons/search";
import { useSuggestion } from "../../helpers/firebase-hooks/get-suggestion";
const find = () => {
  useRedirect();
  const [category, setCat] = useState("");
  const [location, setLoc] = useState("");

  const [error, setError] = useState("");
  const [items, setItems] = useState();
  const [loading, setLoading] = useState(false);
  const [userSug, setuserSug] = useState();
  const modeRef = useRef(true);
  const user = useAuth().user;
  const resetFunc = () => {
    setCat("");
    setLoc("");
  };
  const { sug } = useSuggestion();

  // const getSugestion = useCallback(async () => {
  //   const docref = firebase.firestore().collection("user_add_events");
  //   const docArray = [];
  //   const date = new Date();
  //   const randomL = () => {
  //     const randomLength = Math.floor(Math.random() * 4 + 1);
  //     return randomLength;
  //   };

  //   const tr = await docref
  //     .where("starts", ">=", date)
  //     .limit(randomL())
  //     .get()
  //     .then((docs) => {
  //       docs.forEach((i) => {
  //         docArray.push({
  //           id: i.id,
  //           attendies: i.data().attendies.length,
  //           category: i.data().category,
  //           location: i.data().location,
  //           starts: i.data().starts,
  //         });
  //       });
  //     })
  //     .then(() => {
  //       if (modeRef.current) {
  //         setuserSug(docArray);
  //       }
  //     });
  // }, [setuserSug]);

  // useEffect(() => {
  //   getSugestion();
  //   return () => {
  //     modeRef.current = false;
  //   };
  // }, []);
  const returnCateroies = () => {
    setError("");
    setItems(null);
    setLoading(true);
    if (!category && !location) {
      setError("You Need to select eather a category or Location");
      resetFunc();
      setLoading(false);
      return;
    }

    if (location && category) {
      return locAndCat(location, category)
        .then((i) => {
          if (i.length === 0) {
            setError("Plese refine Your search");
            return;
          }
          return setItems(i);
        })
        .then(() => setLoading(false))
        .then(() => resetFunc());
    }
    if (!location && category) {
      return onlyCat(category)
        .then((i) => {
          if (i.length === 0) {
            setError("Plese refine Your search");
            return;
          }
          return setItems(i);
        })
        .then(() => setLoading(false))
        .then(() => resetFunc());
    }
    if (location && !category) {
      return onlyLoc(location)
        .then((i) => {
          if (i.length === 0) {
            setError("Plese refine Your search");
            return;
          }
          return setItems(i);
        })
        .then(() => setLoading(false))
        .then(() => resetFunc());
    }
  };
  if (loading) {
    return (
      <div>
        <BigLoader />
      </div>
    );
  }
  return (
    <div className={classes.top}>
      <div className={classes.bg}>
        <p>Search Event By category or Location</p>
        <div className={classes.box}>
          <div className={classes.search}>
            <div className={classes.input}>
              <input
                placeholder="By location"
                onChange={(e) => setLoc(e.target.value)}
                value={location}
              />
              <label
                htmlFor="check"
                className={classes.iconSearch}
                onClick={() => returnCateroies()}
              >
                <Search width="25px" color="#FFF" />
              </label>
            </div>
            <div className={classes.input}>
              <input
                placeholder="By category"
                onChange={(e) => setCat(e.target.value)}
                value={category}
              />
              <label
                htmlFor="check"
                className={classes.iconSearch}
                onClick={() => returnCateroies()}
              >
                <Search
                  width="25px"
                  color="#FFF"
                  position="absolute"
                  top="30%"
                  left="25%"
                />
              </label>
            </div>
            {error && <Error>{error}</Error>}
          </div>
        </div>
      </div>
      <div className={classes.secTop}>
        <PiBig>Suggestions</PiBig>
        <ul className={classes.ul}>
          {sug &&
            sug.map((item) => (
              <li key={item.id} className={classes.li}>
                <FindImage item={item} />
              </li>
            ))}
        </ul>
      </div>
      <div className={classes.eventGrid}>
        {items && <EventList items={items} />}
      </div>
    </div>
  );
};

export default find;
