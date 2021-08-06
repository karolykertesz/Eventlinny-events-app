import React, { Fragment, useEffect, useState } from "react";
import EventSummary from "./event-detail/event-summary";
import EventContent from "./event-detail/event-content";
import { Grid } from "./UI/styledindex";
import EventMap from "../components/eventMap";
import { categories, getComments } from "../data";
import classes from "../components/UI/ui-modules/eventComp.module.css";
import RecTCard from "../components/UI/reactbootstrap/card";
import { getAttendiesInfo } from "../data";
import ComentsCross from "../components/holders/commentscross.jsx";
import Nomap from "../components/noMap";
import Eventcard from "../components/UI/eventcard";
import { useRedirect } from "../helpers/validatehelp";

import "firebase/functions";
import { TopHolder } from "../components/holders/indexholders";

const EventComp = ({ single }) => {
  useRedirect();
  const [comments, setComments] = useState(null);
  const attendies = single && single.attendies;
  const location = single !== null && single.location;
  const isImgUrl = categories.includes(single.category);
  const [atttendiesInfo, setInfo] = useState();
  const humanReadableDate = new Date(single.start).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  useEffect(() => {
    let mode = true;
    getAttendiesInfo(attendies && attendies).then((items) => {
      if (mode) {
        setInfo(items);
      }
    });
    return () => {
      mode = false;
    };
  }, []);
  return (
    <Fragment>
      <EventSummary title={single.category} added_by={single.added_by} />
      <div className={classes.allGrid}>
        <div>
          <div className={classes.eventLog}>
            {/* <EventLog
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
            /> */}
          </div>
          <div>
            <EventContent>
              <Eventcard
                url={
                  isImgUrl
                    ? `/images/${single.category}.jpg`
                    : "/images/salmon.jpg"
                }
                category={single.category}
                date={single.start}
                attendies={attendies}
                address={single.location}
                desc={single.description}
                created_by={single.created_by}
              />
              {/* <Pi>event Description: {single.description}</Pi> */}
              {/* {location !== "online" ? (
                <EventMap
                  location={single && single.location}
                  added_by={single && single.added_by}
                  created_by={single && single.created_by}
                />
              ) : (
                <div>
                  <Nomap />
                </div>
              )} */}
            </EventContent>
          </div>
        </div>
        <div className={classes.cover}>
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

          <div className={classes.comentsec}>
            <TopHolder>
              <ComentsCross id={single.id && single.id} />
            </TopHolder>
            {/* <CommentsAddedBy added_by={comments.added_by} />
              <ComentContainer>
                {/* <UseComentTop
                  uid={
                    commentRef.current !== null && commentRef.current.added_by
                  }
                /> */}
            {/* <IconDock icon={Comments} /> */}
            {/* </ComentContainer> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default EventComp;
// "f098bDiH8MVY9d2xNMv8YzCWVdj1"
