import React, { useState } from "react";
import classes from "./ui-modules/createevent.module.css";

const EventsTop = ({ item, additem, clicked }) => {
  return (
    <div className={classes.coverdiv}>
      <div onClick={() => additem(item)} className={classes.topItem}>
        {!clicked ? (
          <div className={!clicked && classes.btn + " " + classes.unclicked}>
            <p>{item}</p>
            <div className={classes.icon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        ) : (
          <div className={classes.btn}>
            <p>{item}</p>

            <div className={classes.icon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsTop;
