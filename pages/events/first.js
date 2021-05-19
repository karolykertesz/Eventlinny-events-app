import react, { useEffect, useState, useCallback } from "react";
import gettoken from "../../helpers/gettoken";
import { Layer } from "../../components/UI/uiLayer ";
import FirstPageItem from "../../components/UI/firstpageItem";
import { NameDiv, Pi } from "../../components/UI/firstpageItem";
import Loader from "../../components/UI/loader";
import classes from "../../components/UI/ui-modules/first.module.css";

const First = () => {
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
    const getTo = async () => {
      const user = await gettoken();
      setuser(user);
    };
    getTo();
  }, []);
  useEffect(() => {
    call();
  }, [call]);
  const getLocation = useCallback(async () => {
    const uid = user ? user.userIn.uid : null;
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
    setuserlocation(message.m);
  }, [setuserlocation]);

  useEffect(() => {
    getLocation();
  }, [getLocation]);
  return !data || !user ? (
    <Loader />
  ) : (
    <div>
      {user && (
        <NameDiv>
          <Pi>
            Dear {user.userIn.name} Your selection of cooking events below
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
      <div className={classes.location}>
        <h5>
          Events close to {userLocation && userLocation.country}/
          {userLocation && userLocation.city}
        </h5>
      </div>
    </div>
  );
};
export default First;
