import React, { useState } from "react";
import DatePicker from "react-datepicker";
require("react-datepicker/dist/react-datepicker.css");
import format from "date-fns/format";
import classes from "./UI/ui-modules/datepicker.module.css";
const EventDatePicker = ({ dateAdder }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const [first, setFirst] = useState(false);
  const handleChange = (date) => {
    return new Promise((resolve, reject) => {
      resolve(setStartDate(date.valueOf()));
    }).then(() => {
      setFirst(true);
    });
  };
  const handleEnd = (data) => {
    setEnd(data.valueOf());
  };
  return (
    <div className={classes.topDiv}>
      <p>Please add the start of the event</p>
      <DatePicker
        selected={startDate}
        onChange={(date) => handleChange(date)}
        timeInputLabel="Time:"
        dateFormat="MM/dd/yyyy h:mm"
        showTimeInput
        isClearable={true}
        calendarClassName={classes.calendar}
        className={classes.border}
      />
      {first && (
        <div className={classes.topDiv}>
          <p>Please add theend of the event</p>
          <DatePicker
            selected={end}
            onChange={(date) => handleEnd(date)}
            timeInputLabel="Time:"
            dateFormat="MM/dd/yyyy h:mm"
            showTimeInput
            isClearable={true}
            calendarClassName={classes.calendar}
            className={classes.border}
          />
        </div>
      )}
    </div>
  );
};

export default EventDatePicker;
