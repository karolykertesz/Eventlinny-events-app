import React, { Fragment, useEffect, useState } from "react";
import EventSummary from "./event-detail/event-summary";
import EventLog from "./event-detail/event-logistics";
import EventContent from "./event-detail/event-content";
import { PiBig, Pi, Grid, List, TopContainer } from "./UI/styledindex";
import EventMap from "../components/eventMap";
import { categories, getComments } from "../data";
import classes from "../components/UI/ui-modules/eventComp.module.css";
import RecTCard from "../components/UI/reactbootstrap/card";
import { getAttendiesInfo } from "../data";
import { IconDock } from "../components/UI/icons/iconcovers";
import Comments from "../components/UI/icons/comments";
import CommentsAddedBy from "../components/comentsAddedBy";
import ComentsCross from "../components/holders/commentscross.jsx";
import {
  ComentContainer,
  UseComentTop,
} from "../components/UI/icons/iconcovers";
import "firebase/functions";
import { TopHolder } from "../components/holders/indexholders";

const EventComp = ({ single }) => {
  // const commentRef = React.useRef(null);
  const [comments, setComments] = useState(null);
  const attendies = single && single.attendies;
  const location = single !== null && single.location;
  const isImgUrl = categories.includes(single.category);
  const [atttendiesInfo, setInfo] = useState();
  // const commentsAddedBy = comments !== null && comments.added_by;
  const humanReadableDate = new Date(single.start).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  // const trueRef = React.useRef(true);
  // const saySomething = () => {
  //   // const ss = firebase   HttpsCallable("sendTest");
  //   const ss = firebase.functions().httpsCallable("sendTest");
  //   ss({ name: "kertesz" }).then((resoult) => {
  //     console.log(resoult.data);
  //   });
  // };
  // const t = getComments("11ae22e6-9abc-4cba-95c6-4aea402ae5cf").then((item) =>
  //   console.log(item)
  // );

  useEffect(() => {
    const setAttendies = async () => {
      const r = await getAttendiesInfo(attendies && attendies).then((items) =>
        setAttendies(items)
      );
    };
    // const ddd = async () => {
    //   const data = await getComments(
    //     "11ae22e6-9abc-4cba-95c6-4aea402ae5cf"
    //   ).then(() => console.log("hhh"));
    //   return setComments(data);
    // };
    // return ddd();

    return () => {
      setAttendies();
      // trueRef.current = false;
    };
  }, []);
  // console.log(comments, "ggg");
  return (
    <Fragment>
      <EventSummary title={single.category} added_by={single.added_by} />
      <div className={classes.allGrid}>
        <div>
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
              {/* <Pi>event Description: {single.description}</Pi> */}
              {location !== "online" && (
                <EventMap
                  location={single && single.location}
                  added_by={single && single.added_by}
                  created_by={single && single.created_by}
                />
              )}
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
              <ComentsCross id={single.id} />
            </TopHolder>
            {/* <CommentsAddedBy added_by={comments.added_by} />
              <ComentContainer>
                {/* <UseComentTop
                  uid={
                    commentRef.current !== null && commentRef.current.added_by
                  }
                /> */}
            {/* <IconDock icon={Comments} /> */}
            {/* </ComentContainer> */} */
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default EventComp;
// "f098bDiH8MVY9d2xNMv8YzCWVdj1"
