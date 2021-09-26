import React, { useState } from "react";
import { useRouter } from "next/router";
import { useRedirect } from "../../helpers/validatehelp";
import { useAuth } from "../../components/Layout/UserContext";
import { useGetSignEvents } from "../../helpers/firebase-hooks/get-user-sign-events";
import MeetingItems from "../../components/meetingitems";
import classes from "../../components/UI/ui-modules/meeting-items.module.css";
const Main = () => {
  useRedirect();
  const router = useRouter();
  const { user } = useAuth();
  const { signed } = useGetSignEvents(user && user.uid);
  const userName = user && user.name;

  return (
    <main className={classes.main}>
      {signed && signed.length > 0 ? (
        <div className={classes.allGrid}>
          {signed.map((meeting) => (
            <div key={meeting.id}>
              <MeetingItems meeting={meeting} />
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </main>
  );
};
export default Main;
