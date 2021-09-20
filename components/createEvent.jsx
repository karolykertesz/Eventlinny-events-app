import React, { useState, Fragment } from "react";

import classes from "./UI/ui-modules/createevent.module.css";
import EventsTop from "./UI/eventstop";
import { categories } from "../data";
import Eventadder from "./UI/eventadder";

const CreateEvent = ({ uid }) => {
  const [category, setCat] = useState();
  const [clicked, setcicked] = useState(false);
  const additem = (item) => {
    setCat(item);
    setcicked(!clicked);
    if (clicked) {
      setCat(null);
    }
  };
  return (
    <Fragment>
      <h2 className={classes.heading}>Create a category</h2>
      <div className={classes.coverdiv}>
        <div className={classes.grid}>
          {categories.map((item) => (
            <EventsTop
              item={item}
              additem={additem}
              clicked={clicked}
              key={item}
            />
          ))}
        </div>
      </div>
      {category && (
        <div className={classes.coverdiv}>
          <Eventadder
            category={category}
            uid={uid}
            setcicked={setcicked}
            clicked={clicked}
            setCat={setCat}
          />
        </div>
      )}
    </Fragment>
  );
};
export default CreateEvent;
