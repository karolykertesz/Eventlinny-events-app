import React, { useState } from "react";
import { useRouter } from "next/router";
import { useRedirect } from "../../helpers/validatehelp";
import { useAuth } from "../../components/Layout/UserContext";
import { useSingleEvent } from "../../helpers/firebase-hooks/get-single-event";
import DynamicZoom from "../../components/Layout/dynamic";
import BigTest from "../../components/UI/ggggggg";
const Main = () => {
  useRedirect();
  const router = useRouter();
  const user = useAuth().user;
  // const id = router.query.id;
  const id = "24430ba1-465b-4adb-b597-260daf7d77be";
  const { event } = useSingleEvent(id);

  const userName = user && user.name;
  const [error, setError] = useState();

  return (
    <main>
      {/* <DynamicZoom
        id={id}
        event={event && event}
        user={user && user}
        setError={setError}
      /> */}
      {error && error}
      <BigTest />
    </main>
  );
};
export default Main;
