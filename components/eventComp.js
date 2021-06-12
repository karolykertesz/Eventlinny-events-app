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
import { categories } from "../data";

const EventComp = ({ single }) => {
  const attendies = single && single.attendies;
  const location = single !== null && single.location;
  const isImgUrl = categories.includes(single.category);
  return (
    <Fragment>
      <EventSummary title={single.category} />
      <EventLog
        date={single.start}
        address={single.location}
        imageAlt={single.category}
        image={isImgUrl ? `images/${single.category}.jpg` : "images/salmon.jpg"}
        start={single.start}
        addedby={single.added_by}
        attendies={attendies}
        id={single.id}
        end={single.end}
        created_by={single.created_by}
      />
      <EventContent>
        <Pi>event Description: {single.description}</Pi>
        {location !== "online" && (
          <EventMap
            location={single && single.location}
            added_by={single && single.added_by}
            created_by={single && single.created_by}
          />
        )}
      </EventContent>
    </Fragment>
  );
};
export default EventComp;
