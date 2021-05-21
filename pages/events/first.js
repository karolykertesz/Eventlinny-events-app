import react, { useEffect, useState, useCallback } from "react";
import gettoken from "../../helpers/gettoken";
import { Layer } from "../../components/UI/uiLayer ";
import FirstPageItem from "../../components/UI/firstpageItem";
import { NameDiv, Pi } from "../../components/UI/firstpageItem";
import Loader from "../../components/UI/loader";
import classes from "../../components/UI/ui-modules/first.module.css";
import { useAuth } from "../../components/Layout/UserContext";
const First = () => {
  const userInfo = useAuth().user;
  const [data, setData] = useState();
  const [user, setuser] = useState();
  const [userLocation, setuserlocation] = useState();

  const t = data;
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
          <Pi>Dear {userInfo.name} Your selection of cooking events below</Pi>
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
          <h5>
            Events close to {userLocation.country}/{userLocation.city}
          </h5>
        </div>
      )}
    </div>
  );
};
export default First;
