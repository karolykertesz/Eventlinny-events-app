import React, { useState } from "react";
import { useRouter } from "next/router";
import { useRedirect } from "../../helpers/validatehelp";
import { useAuth } from "../../components/Layout/UserContext";
import { useSingleEvent } from "../../helpers/firebase-hooks/get-single-event";

const Main = () => {
  useRedirect();
  const router = useRouter();
  const user = useAuth().user;
  // const id = router.query.id;
  const id = "24430ba1-465b-4adb-b597-260daf7d77be";
  const { event } = useSingleEvent(id);
  const meeetingNumber = id;
  const userName = user && user.name;
  const [error, setError] = useState();
  const [meetingUrl, setmeetingUrl] = useState();
  const joinMeeting = async () => {
    if (event.data && user) {
      if (!event.data.attendies.includes(user.uid)) {
        return setError("Sorry You didn't signup for this event!!");
      }
      const role = event.data.added_by === user.uid ? 1 : 0;
    }
  };
  return (
    <main>
      <iframe src={meetingUrl ? meetingUrl : ""} frameBorder="0"></iframe>
      {error && error}
    </main>
  );
};
export default Main;
