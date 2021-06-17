import React, { Fragment, useState, useEffect } from "react";
import classes from "./css/commentholders.module.css";
export const TopHolder = (props) => {
  return <div className={classes.top}>{props.children}</div>;
};
