import React, { Fragment, useEffect, useState } from "react";
import EventSummary from "./event-detail/event-summary";
import EventLog from "./event-detail/event-logistics";
import EventContent from "./event-detail/event-content";
import { PiBig } from "./UI/styledComponents";
import EventMap from "../components/eventMap";

const EventComp = ({ single }) => {
  const attendies = single && single.attendies;
  const [loc, setLoc] = useState();
  const location = single !== null && single.location;
  const add = async () => {
    if (location && location === "online") {
      setLoc("online");
    } else if (location && location !== "online") {
      try {
        const mess = await fetch(
          `http://api.geonames.org/postalCodeSearchJSON?placename=${location}&maxRows=1&username=carlo12345`
        );
        const data = await mess.json();
        setLoc(data);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("no data");
      return;
    }
  };
  useEffect(() => {
    return add();
  }, []);
  console.log(loc);
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
        {/* <PiBig>event Description: {single.description}</PiBig> */}
        <EventMap />
      </EventContent>
    </Fragment>
  );
};

export default EventComp;
