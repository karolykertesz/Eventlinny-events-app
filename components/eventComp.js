import React, {
  Fragment,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import EventSummary from "./event-detail/event-summary";
import EventLog from "./event-detail/event-logistics";
import EventContent from "./event-detail/event-content";
import { PiBig, Pi } from "./UI/styledComponents";
import EventMap from "../components/eventMap";

const EventComp = ({ single }) => {
  // useEffect(() => {
  //   return () => {
  //     add()
  //       .then((items) => addMem(items))
  //       .then(() => console.log("jh"));
  //   };
  // }, [loc]);
  // const addMem = (tr) => {
  //   if (!loc) {
  //     setLoc(tr);
  //   } else {
  //     return;
  //   }
  // };
  const attendies = single && single.attendies;
  const location = single !== null && single.location;

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
        attendies={attendies}
        id={single.id}
        end={single.end}
      />
      <EventContent>
        <Pi>event Description: {single.description}</Pi>
        {location !== "online" && (
          <EventMap
            // latitude={loc && loc.postalCodes[0].lat}
            // longitude={loc && loc.postalCodes[0].lng}
            location={single.location}
            // cd={loc && loc.postalCodes[0].countryCode}
            added_by={single && single.added_by}
          />
        )}
      </EventContent>
    </Fragment>
  );
};
export default EventComp;
