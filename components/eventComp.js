import React, { Fragment, useEffect, useState } from "react";
import EventSummary from "./event-detail/event-summary";
import EventLog from "./event-detail/event-logistics";
import EventContent from "./event-detail/event-content";
import { PiBig, Pi, Grid } from "./UI/styledComponents";
import EventMap from "../components/eventMap";
import { categories } from "../data";
import classes from "../components/UI/ui-modules/eventComp.module.css";
import RecTCard from "../components/UI/reactbootstrap/card";
const EventComp = ({ single }) => {
  const attendies = single && single.attendies;
  const location = single !== null && single.location;
  const isImgUrl = categories.includes(single.category);
  return (
    <Fragment>
      <EventSummary title={single.category} />
      <div className={classes.allGrid}>
        <div className={classes.eventLog}>
          <EventLog
            date={single.start}
            address={single.location}
            imageAlt={single.category}
            image={
              isImgUrl ? `images/${single.category}.jpg` : "images/salmon.jpg"
            }
            start={single.start}
            addedby={single.added_by}
            attendies={attendies}
            id={single.id}
            end={single.end}
            created_by={single.created_by}
          />
        </div>
        <div>
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
          <div className={classes.cover}>
            <Grid>
              <RecTCard
                memberlink="/members"
                title="kertesz"
                cargHeigth="150px"
              />
            </Grid>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default EventComp;
