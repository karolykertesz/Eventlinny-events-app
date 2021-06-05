import React, { Fragment } from "react";
import EventSummary from "./event-detail/event-summary";
import EventLog from "./event-detail/event-logistics";
import EventContent from "./event-detail/event-content";
import { PiBig } from "./UI/styledComponents";
const EventComp = ({ single }) => {
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
        <PiBig>{single.category}</PiBig>
      </EventContent>
    </Fragment>
  );
};

export default EventComp;
