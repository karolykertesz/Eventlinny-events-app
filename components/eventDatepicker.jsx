import React, { useState } from "react";
import DatePicker from "react-datepicker";
require("react-datepicker/dist/react-datepicker.css");
import format from "date-fns/format";
import classes from "./UI/ui-modules/datepicker.module.css";
import { ButtonCover, Buttondiv } from "../pages/userpage/edit/location";
const EventDatePicker = ({ addDate, formSubmit }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [completed, setcompleted] = useState(false);
  const [first, setFirst] = useState(false);
  const handleChange = (date) => {
    return new Promise((resolve, reject) => {
      resolve(setStartDate(date.valueOf()));
    })
      .then(() => {
        setFirst(true);
      })
      .then(() => {
        addDate({
          type: "field",
          fildName: "startDay",
          payload: startDate.valueOf(),
        });
      });
  };
  const handleEnd = (data) => {
    return new Promise((resolve, reject) => {
      resolve(setEnd(data.valueOf()));
    })
      .then(() => {
        setcompleted(true);
      })
      .then(() => {
        addDate({ type: "field", fildName: "endDay", payload: end.valueOf() });
      });
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
        calendarClassName={classes.calendar}
        className={classes.border}
        minDate={startDate}
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
            calendarClassName={classes.calendar}
            className={classes.border}
            minDate={startDate}
          />
        </div>
      )}
      {completed && (
        <div className={classes.buttonDiv}>
          <div className={classes.inn}>
            <span>
              <button
                className={classes.btn + " " + classes.cancel}
                onClick={(e) => formSubmit(e, false)}
              >
                cancel
              </button>
            </span>
          </div>
          <div className={classes.inn}>
            <span>
              <button
                className={classes.btn}
                onClick={(e) => formSubmit(e, true)}
              >
                add
              </button>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDatePicker;
