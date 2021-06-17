import React from "react";
import classes from "./css/nocomment.module.css";
export const Nocomments = () => {
  return (
    <div className={classes.noTop}>
      <p> (0) comments for this Event</p>
    </div>
  );
};
