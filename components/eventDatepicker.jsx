import React, { useState } from "react";
import DatePicker from "react-datepicker";
require("react-datepicker/dist/react-datepicker.css");
import format from "date-fns/format";
import classes from "./UI/ui-modules/datepicker.module.css";
import { Pi } from "./UI/styledComponents";
const EventDatePicker = ({ addDate, formSubmit }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [completed, setcompleted] = useState(false);
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
  const [descri, setDes] = useState("");
  const [descComp, done] = useState(false);
  const cancelDescri = () => {
    return new Promise((resolve, reject) => {
      resolve(setDes(""));
    }).then(() => {
      addDate({ type: "field", fildName: "description", payload: "" });
    });
  };
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
        setSecond(true);
      })
      .then(() => {
        addDate({ type: "field", fildName: "endDay", payload: end.valueOf() });
      });
  };
  const addonchange = () => {
    return new Promise((resolve, reject) => {
      resolve(
        addDate({
          type: "field",
          fildName: "description",
          payload: descri,
        })
      );
    })
      .then(() => {
        setcompleted(true);
      })
      .then(() => {
        done(true);
      });
  };

  return (
    <div className={classes.topDiv}>
      <Pi>Please add the start of the event</Pi>
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
          <Pi>Please add the end of the event</Pi>
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
      {second && (
        <div>
          <div className={descComp && classes.none}>
            <Pi>Add Your Description!</Pi>
            <label htmlFor="description"></label>
            <textarea
              id="description"
              value={descri}
              onChange={(e) => setDes(e.target.value)}
            />
            <div className={classes.buttonDiv}>
              <span className={classes.btn} onClick={() => addonchange()}>
                Add
              </span>
            </div>
            <div className={classes.buttonDiv}>
              <span
                className={classes.btn + " " + classes.cancel}
                onClick={() => cancelDescri()}
              >
                cancel
              </span>
            </div>
          </div>
          {descComp && <Pi>Your event Description: {descri}</Pi>}
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
