import React, { Fragment, useState, useEffect } from "react";
import firebase from "firebase";
import EventSummary from "./event-detail/event-summary";
import EventLog from "./event-detail/event-logistics";
import EventContent from "./event-detail/event-content";
import { PiBig } from "./UI/styledComponents";
import { useAuth } from "../components/Layout/UserContext";
import { SVG, CoverRow } from "../components/UI/styledindex";
const EventComp = ({ single }) => {
  const [signedUp, setSignedUp] = useState();
  const userId = useAuth().user && useAuth().user.uid;
  const id = single.id;

  const attendies = single && single.attendies;
  const isThere = attendies.find((i) => i === userId);

  const signUp = () => {
    return firebase
      .firestore()
      .collection("user_add_events")
      .doc(id)
      .update({
        attendies: firebase.firestore.FieldValue.arrayUnion(userId),
      })
      .then(() => setSignedUp(true));
  };
  useEffect(() => {
    const checkisSigned = () => {
      const isThere = attendies.find((i) => i === userId);
      if (isThere) {
        setSignedUp(true);
      } else {
        setSignedUp(false);
      }
    };
    return checkisSigned();
  }, []);
  return (
    <Fragment>
      <EventSummary title={single.category} />
      <EventLog
        date={single.start}
        address={single.location}
        imageAlt={single.category}
        image={`images/${single.category}.jpg`}
        start={single.start}
        addedby={single.added_by}
      />
      <EventContent>
        <PiBig>event Description: {single.description}</PiBig>
        {!signedUp ? (
          <CoverRow>
            <PiBig>Sign up!</PiBig>
            <SVG onClick={() => signUp()}>
              <span>
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
              </span>
            </SVG>
          </CoverRow>
        ) : (
          <Fragment>
            <PiBig>You Sign Up for this Event Thank You</PiBig>
          </Fragment>
        )}
      </EventContent>
    </Fragment>
  );
};

export default EventComp;
