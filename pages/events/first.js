import React from "react";
import { NameDiv, Pi } from "../../components/UI/firstpageItem";
import BigLoader from "../../components/UI/BigLoader";
import { useAuth } from "../../components/Layout/UserContext";
import EventList from "../../components/EventList";
import { useRedirect } from "../../helpers/validatehelp";
import { useCheckcatSet } from "../../helpers/firebase-hooks/check-prefs";
import { useCategories } from "../../helpers/firebase-hooks/pref-catecories";
import { useUserPrefCategories } from "../../helpers/firebase-hooks/get-user-pref-cats";
const First = () => {
  useRedirect();
  const user = useAuth().user;
  const uid = user && user.uid;
  useCheckcatSet(uid);
  const { pref } = useCategories(uid);
  const { prefItems } = useUserPrefCategories(pref);
  return !user ? (
    <BigLoader />
  ) : (
    <div style={{ position: "relative", marginTop: "100px" }}>
      {user && (
        <NameDiv>
          <Pi>
            Dear {user && user.name} Your selection of active cooking events
            below
          </Pi>
        </NameDiv>
      )}

      {prefItems && <EventList items={prefItems} />}
    </div>
  );
};

export default First;
