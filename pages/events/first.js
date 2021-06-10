import react, { useEffect, useState, useCallback } from "react";
import { Layer } from "../../components/UI/uiLayer ";
import FirstPageItem from "../../components/UI/firstpageItem";
import { NameDiv, Pi } from "../../components/UI/firstpageItem";
import Loader from "../../components/UI/loader";
import classes from "../../components/UI/ui-modules/first.module.css";
import { useAuth } from "../../components/Layout/UserContext";
import { getusercat, getuserPrefWithWithCat } from "../../data";
import EventList from "../../components/EventList";
const First = () => {
  const userInfo = useAuth().user;
  const [data, setData] = useState();
  const [user, setuser] = useState();
  const [userLocation, setuserlocation] = useState();
  const [userPrefs, setUserPrefs] = useState();

  const t = data;
  // const rr = getusercat(userInfo.uid);
  console.log(userPrefs, "jjj");
  const call = useCallback(async () => {
    const mess = await fetch("/api/users/helpers/firstPage");
    const d = await mess.json();
    setData(d);
  }, [setData]);
  useEffect(() => {
    setuser(userInfo);
  }, [userInfo]);
  useEffect(() => {
    call();
  }, [call]);

  useEffect(() => {
    const getStaticData = async () => {
      const uid = userInfo ? userInfo.uid : null;
      const categories = uid !== null && (await getusercat(uid));
      const prefItems =
        uid !== null &&
        (await getuserPrefWithWithCat(categories).then((items) =>
          setUserPrefs(items)
        ));
    };
    return () => getStaticData();
  }, []);
  const getLocation = async (uid) => {
    if (uid !== null || uid !== undefined) {
      try {
        const mess = await fetch("/api/users/helpers/userlocation", {
          method: "POST",
          body: JSON.stringify({
            uid: uid,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const message = await mess.json();
        return setuserlocation(message.m);
      } catch (err) {
        console.log(err);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    const uid = userInfo ? userInfo.uid : null;
    getLocation(uid);
  }, [user]);
  return !data || !user ? (
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
      {userLocation && (
        <div className={classes.location}>
          <h5>Events close to {userLocation.location}</h5>
        </div>
      )}
      {userPrefs && <EventList items={userPrefs} />}
    </div>
  );
};

export default First;
