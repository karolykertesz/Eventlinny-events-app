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
import classes from "../../components/UI/ui-modules/find.module.css";
import { getuserPrefWithWithCat, getusercat } from "../../data";
import { useAuth } from "../../components/Layout/UserContext";
import FindImage from "../../components/findImage";
const find = () => {
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

  const getSugestion = async () => {
    if (!modeRef.current) return;
    setLoading(true);
    const uid = user ? user.uid : null;
    if (uid !== null) {
      const usecats = await getusercat(uid);
      return getuserPrefWithWithCat(usecats)
        .then((items) => {
          if (modeRef.current) {
            setuserSug(items);
          }
        })
        .then(() => setLoading(false));
    }
  };

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
      <div>
        <Cover>
          <PiBig>Find Event</PiBig>
          {isCat && (
            <Cdiv>
              <SelectInput setCat={setCat} />
            </Cdiv>
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

          <SendButton onClick={() => returnCateroies()}>Find Event</SendButton>
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

          {error && <Error>{error}</Error>}
        </Cover>
        <Cover>{items && <EventList items={items} />}</Cover>
      </div>
      <div></div>
      <div className={classes.secTop}>
        <PiBig>Suggestions</PiBig>
        <ul>
          {userSug &&
            userSug.map((item) => (
              <li key={item.id}>
                <FindImage item={item} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default find;
