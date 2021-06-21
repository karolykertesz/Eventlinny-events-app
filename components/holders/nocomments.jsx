import React from "react";
import classes from "./css/nocomment.module.css";
import AddCommentsAccordion from "../UI/reactbootstrap/accordion";
export const Nocomments = ({ docid, id }) => {
  return (
    <div>
      <div className={classes.noTop}>
        <p> (0) comments for this Event</p>
      </div>
      <AddCommentsAccordion docId={docid} isCom={false} id={id} />
    </div>
  );
};
