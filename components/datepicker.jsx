import React, { useState } from "react";
import DatePicker from "react-datepicker";
import firebase from "firebase";
require("react-datepicker/dist/react-datepicker.css");
import classes from "./UI/ui-modules/datepicker.module.css";
// import { registerLocale, setDefaultLocale } from "react-datepicker";
// import hu from "date-fns/locale/hu";
// registerLocale("hu", hu);

const Datepicker = (props) => {
  const uid = props.uid;
  const [startDate, setStartDate] = useState(new Date());
  const [date, setEndDate] = useState(null);
  const [isopen, setisopen] = useState(false);
  const [message, setmessage] = useState("Click to open!");
  const [error, setError] = useState("");
  const r = date && date.toString().split(" ").splice(0, 4).join(" ");

  const onChange = (date) => {
    setEndDate(date);
  };
  const handleCalendarClose = () => setmessage("Click to open!");
  const handleCalendarOpen = () => setmessage("Add Your Birthday");
  const sendvalue = () => {
    if (!date) {
      setError("please pick a date!!");
    }
    const docref = firebase.firestore().collection("user_aditional").doc(uid);
    return docref
      .get()
      .then((doc) => {
        if (doc.exists) {
          docref.update({
            birthday: r,
          });
        }
      })
      .then(() => {
        setError("Your birthday added");
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
  return (
    <div className={classes.cover}>
      <DatePicker
        selected={date}
        onChange={onChange}
        startDate={startDate}
        placeholderText={message}
        onCalendarOpen={handleCalendarOpen}
        onCalendarClose={handleCalendarClose}
        calendarClassName={classes.calendar}
        className={classes.border}
        maxDate={startDate}
        scrollableMonthYearDropdown
        showYearDropdown
        isClearable
      />
      <button className={classes.btn} onClick={() => sendvalue()}>
        Add
      </button>
      <p>{error && error}</p>
    </div>
  );
};

export default Datepicker;
