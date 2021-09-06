import React from "react";
import FirstPageItem from "../../components/UI/firstpageItem";
import { NameDiv, Pi } from "../../components/UI/firstpageItem";
import BigLoader from "../../components/UI/BigLoader";
import classes from "../../components/UI/ui-modules/first.module.css";
import { useAuth } from "../../components/Layout/UserContext";
import EventList from "../../components/EventList";
import { useRedirect } from "../../helpers/validatehelp";
import { useCheckcatSet } from "../../helpers/firebase-hooks/check-prefs";
import { useCategories } from "../../helpers/firebase-hooks/pref-catecories";
import { useUserPrefCategories } from "../../helpers/firebase-hooks/get-user-pref-cats";
// import classes from "../../components/UI/ui-modules/first.page.module.css";
const First = () => {
  useRedirect();
  const user = useAuth().user;
  const uid = user && user.uid;
  useCheckcatSet(uid);
  const { pref } = useCategories(uid);
  const { prefItems } = useUserPrefCategories(pref);
  // const [data, setData] = useState();
  // const [user, setuser] = useState();
  // const [userLocation, setuserlocation] = useState();
  // const [userPrefs, setUserPrefs] = useState();
  // const t = data;
  // const call = useCallback(async () => {
  //   const mess = await fetch("/api/users/helpers/firstPage");
  //   const d = await mess.json();
  //   setData(d);
  // }, [setData]);
  // const getStaticData = useCallback(async () => {
  //   const uid = userInfo ? userInfo.uid : null;
  //   if (uid !== null) {
  //     try {
  //       const categories = await getusercat(uid && uid);
  //       return getuserPrefWithWithCat(categories)
  //         .then((items) => {
  //           const date = Date.now();
  //           const itemsTosort = items.filter((i) => i.start > date);
  //           return setUserPrefs(itemsTosort);
  //         })
  //         .then(() => console.log("jj"));
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // }, [setUserPrefs]);

  // useEffect(() => {
  //   call();
  //   return () => {
  //     modeRef.current = false;
  //   };
  // }, [call]);
  // useEffect(() => {
  //   getStaticData();

  //   return () => {
  //     modeRef.current = false;
  //   };
  // }, [getStaticData]);
  return !user ? (
    <BigLoader />
  ) : (
    <div style={{ position: "relative" }}>
      {user && (
        <NameDiv>
          <Pi>
            Dear {user && user.name} Your selection of cooking events below
          </Pi>
        </NameDiv>
      )}
      {/* <Layer>
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
      </Layer> */}

      {prefItems && <EventList items={prefItems} />}
    </div>
  );
};

export default First;
