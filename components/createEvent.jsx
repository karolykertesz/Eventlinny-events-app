import React from "react";
import firebase from "firebase";
import classes from "./UI/ui-modules/createevent.module.css";
import EventsTop from "./UI/eventstop";

const CreateEvent = ({ uid }) => {
  const additem = () => {};
  return (
    <div className={classes.coverdiv}>
      {/* <EventsTop item={item} uid={uid}/> */}
      <div className={classes.grid}></div>
    </div>
  );
};
export default CreateEvent;
