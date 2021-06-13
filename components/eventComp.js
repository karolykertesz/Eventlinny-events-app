import React, { Fragment, useEffect, useState } from "react";
import EventSummary from "./event-detail/event-summary";
import EventLog from "./event-detail/event-logistics";
import EventContent from "./event-detail/event-content";
import { PiBig, Pi, Grid, List } from "./UI/styledComponents";
import EventMap from "../components/eventMap";
import { categories } from "../data";
import classes from "../components/UI/ui-modules/eventComp.module.css";
import RecTCard from "../components/UI/reactbootstrap/card";
import { getAttendiesInfo } from "../data";
const EventComp = ({ single }) => {
  const attendies = single && single.attendies;
  const location = single !== null && single.location;
  const isImgUrl = categories.includes(single.category);
  const [atttendiesInfo, setInfo] = useState();
  useEffect(() => {
    const setAttendies = async () => {
      return getAttendiesInfo(attendies && attendies)
        .then((items) => {
          return setInfo(items);
        })
        .then(() => {});
    };
    return () => {
      return setAttendies();
    };
  }, []);
  console.log(atttendiesInfo);
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
            <PiBig>Attendies ({attendies.length})</PiBig>
            <Grid>
              {
                atttendiesInfo &&
                  atttendiesInfo.map((item) => (
                    <RecTCard
                      key={item.id}
                      memberlink={`/users/members/${item.id}`}
                      title={item.name}
                      cargHeigth="120px"
                      member={item.id == single.added_by ? "Host" : "Member"}
                      src={item.imgUrl}
                    />
                  ))
                //
              }
            </Grid>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default EventComp;
