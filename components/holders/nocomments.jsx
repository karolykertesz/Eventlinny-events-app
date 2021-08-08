import React from "react";
import classes from "./css/nocomment.module.css";
import AddCommentsAccordion from "../UI/reactbootstrap/accordion";
export const Nocomments = ({ docid, id }) => {
  return (
    <div className={classes.holder}>
      <AddCommentsAccordion docId={docid} isCom={false} id={id} />
    </div>
  );
};
