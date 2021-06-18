import React, { useEffect, useState, useCallback } from "react";
import { Layer } from "../../components/UI/uiLayer ";
import FirstPageItem from "../../components/UI/firstpageItem";
import { NameDiv, Pi } from "../../components/UI/firstpageItem";
import Loader from "../../components/UI/loader";
import classes from "../../components/UI/ui-modules/first.module.css";
import { useAuth } from "../../components/Layout/UserContext";
import { getusercat, getuserPrefWithWithCat } from "../../data";
import EventList from "../../components/EventList";
import { useRedirect } from "../../helpers/validatehelp";
const First = () => {
  let mode = true;
  const valid = useRedirect();
  const userInfo = useAuth().user;
  const [data, setData] = useState();
  const [user, setuser] = useState();
  const [userLocation, setuserlocation] = useState();
  const [userPrefs, setUserPrefs] = useState();
  const t = data;
  const call = useCallback(async () => {
    const mess = await fetch("/api/users/helpers/firstPage");
    const d = await mess.json();
    setData(d);
  }, [setData]);
  const getStaticData = async () => {
    const uid = userInfo ? userInfo.uid : null;
    if (uid !== null) {
      try {
        const categories = await getusercat(uid && uid);
        const prefItems = await getuserPrefWithWithCat(categories).then(
          (items) => {
            if (mode) {
              setUserPrefs(items);
            }
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getStaticData().then(() => {
      call();
    });
    return () => {
      mode = false;
    };
  }, []);

  return !data || !userInfo ? (
    <Loader />
  ) : (
    <div>
      {user && (
        <NameDiv>
          <Pi>
            Dear {userInfo && userInfo.name} Your selection of cooking events
            below
          </Pi>
        </NameDiv>
      )}
      <Layer>
        {t.m &&
          t.m.map((item, indx) => (
            <span key={indx}>
              <FirstPageItem
                image={item.image}
                cusineName={item.description}
                location={userLocation}
              />
            </span>
          ))}
      </Layer>
      {userPrefs && (
        <div className={classes.location}>
          <h5>Events from Your Selected categories</h5>
        </div>
      )}
      {userPrefs && <EventList items={userPrefs} />}
    </div>
  );
};

export default First;
