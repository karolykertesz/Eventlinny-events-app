import React, {
  useState,
  Fragment,
  useEffect,
  useCallback,
  useRef,
} from "react";
import Loader from "../../components/UI/loader";
import EventList from "../../components/EventList";
import {
  onlyCat,
  onlyLoc,
  locAndCat,
} from "../../helpers/wrappers/findfunctions";

import {
  Pi,
  PiBig,
  Cover,
  Input,
  SendButton,
  InputHolder,
  SVG,
  CatContainer,
  Cdiv,
  Error,
} from "../../components/UI/styledindex";
import SelectInput from "../../components/selectinput";
import FindSelect from "../../components/UI/findselect";
import classes from "../../components/UI/ui-modules/find.module.css";
import { getuserPrefWithWithCat, getusercat } from "../../data";
import { useAuth } from "../../components/Layout/UserContext";
import FindImage from "../../components/findImage";
import firebase from "firebase";
import { useRedirect } from "../../helpers/validatehelp";

const find = () => {
  useRedirect();
  const [category, setCat] = useState("");
  const [location, setLoc] = useState("");
  const [closed, setClose] = useState(false);
  const [isCat, setIscat] = useState(false);
  const [error, setError] = useState("");
  const [items, setItems] = useState();
  const [loading, setLoading] = useState(false);
  const [userSug, setuserSug] = useState();
  const modeRef = useRef(true);
  const user = useAuth().user;

  const setitems = () => {
    setIscat(!isCat);
    setError("");
  };

  const getSugestion = useCallback(async () => {
    const docref = firebase.firestore().collection("user_add_events");
    const docArray = [];
    const date = new Date();
    const randomL = () => {
      const randomLength = Math.floor(Math.random() * 4 + 1);
      return randomLength;
    };

    const tr = await docref
      .where("starts", ">=", date)
      .limit(randomL())
      .get()
      .then((docs) => {
        docs.forEach((i) => {
          docArray.push({
            id: i.id,
            attendies: i.data().attendies.length,
            category: i.data().category,
            location: i.data().location,
            starts: i.data().starts,
          });
        });
      })
      .then(() => {
        if (modeRef.current) {
          setuserSug(docArray);
        }
      });
  }, [setuserSug]);
  console.log(userSug);
  useEffect(() => {
    getSugestion();
    return () => {
      modeRef.current = false;
    };
  }, []);
  const returnCateroies = () => {
    setError("");
    setItems(null);
    setLoading(true);
    if (!category && !location) {
      setError("You Need to select eather a category or Location");
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
        .then(() => setLoading(false));
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
        .then(() => setLoading(false));
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
        .then(() => setLoading(false));
    }
  };
  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return (
    <div className={classes.top}>
      <div className={classes.cc}>
        <div className={classes.bg}>
          <Cover>
            <PiBig>{!isCat && "Find Event"}</PiBig>
            {isCat && (
              <div className={classes.selectDiv}>
                <FindSelect setCat={setCat} />
              </div>
            )}
            {!isCat && (
              <InputHolder>
                <Input
                  placeholder="By category"
                  onChange={(e) => setCat(e.target.value)}
                  value={category}
                />
                <Input
                  placeholder="By location"
                  onChange={(e) => setLoc(e.target.value)}
                  value={location}
                />
              </InputHolder>
            )}

            <SendButton onClick={() => returnCateroies()}>
              Find Event
            </SendButton>
            <CatContainer>
              <Pi>{!isCat ? "Or select category" : "Cancel category"}</Pi>
              <SVG onClick={() => setitems()}>
                {!isCat ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </SVG>
            </CatContainer>
            {items && <EventList items={items} />}

            {error && <Error>{error}</Error>}
          </Cover>
        </div>
      </div>
      <div className={classes.secTop}>
        <PiBig>Suggestions</PiBig>
        <ul className={classes.ul}>
          {userSug &&
            userSug.map((item) => (
              <li key={item.id} className={classes.li}>
                <FindImage item={item} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default find;
