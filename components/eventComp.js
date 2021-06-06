import React, { Fragment } from "react";
import EventSummary from "./event-detail/event-summary";
import EventLog from "./event-detail/event-logistics";
import EventContent from "./event-detail/event-content";
import { PiBig } from "./UI/styledComponents";

const EventComp = ({ single }) => {
  const attendies = single && single.attendies;

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
      />
      <EventContent>
        <PiBig>event Description: {single.description}</PiBig>
      </EventContent>
    </Fragment>
  );
};

export default EventComp;
